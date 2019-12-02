import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { map, tap, filter } from "rxjs/operators";

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Store } from 'store';

export interface Task {
  name: string,
  priority: number,
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class MyTaskService {
  constructor(
    private afdb: AngularFireDatabase,
    private authService: AuthService,
    private store: Store
  ) {}

  tasks$: Observable<Task[]> = this.afdb.list(`tasks/${this.uid}`)
  .snapshotChanges().pipe(
    map(tasks =>
      tasks.map(task => ({ $key: task.key, ...task.payload.val() as Task }))
    ),
    tap(next => this.store.set('tasks', next))
  );

  get uid() {
    return this.authService.user.uid;
  }

  getTasks(key: string) {
    if (!key) return of({});
    return this.store.select<Task[]>('tasks').pipe(
      filter(tasks => tasks !== null && tasks !== undefined),
      map(tasks => tasks.find((exercise: Task) => exercise.$key === key))
    );
  }
  
  addTask(tasks: Task) {
    return this.afdb.list(`tasks/${this.uid}`).push(tasks);
  }

  removeTask(key: string) {
    return this.afdb.list(`tasks/${this.uid}`).remove(key);
  }

  updateTask(key: string, tasks: Task) {
    return this.afdb.object(`tasks/${this.uid}/${key}`).update(tasks);
  }

}