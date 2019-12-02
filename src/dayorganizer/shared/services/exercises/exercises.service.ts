import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, tap, filter } from "rxjs/operators";

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Store } from 'store';

export interface Exercise {
  name: string,
  duration: number,
  notes: string,
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class ExercisesService {
  
  constructor(
    private store: Store,
    private afdb: AngularFireDatabase,
    private authService: AuthService
    ) {}
    
  exercises$: Observable<Exercise[]> = this.afdb.list(`exercises/${this.uid}`)
    .snapshotChanges().pipe(
      map(exercises =>
        exercises.map(exercise => ({ $key: exercise.key, ...exercise.payload.val() as Exercise }))
      ),
      tap(next => this.store.set('exercises', next))
    );

  get uid() {
    return this.authService.user.uid;
  }

  getExercises(key: string) {
    if (!key) return of({});
    return this.store.select<Exercise[]>('exercises').pipe(
      filter(exercises => exercises !== null && exercises !== undefined),
      map(exercises => exercises.find((exercise: Exercise) => exercise.$key === key))
    );
  }

  addExercise(exercises: Exercise) {
    return this.afdb.list(`exercises/${this.uid}`).push(exercises);
  }

  removeExercise(key: string) {
    return this.afdb.list(`exercises/${this.uid}`).remove(key);
  }

  updateExercise(key: string, exercises: Exercise) {
    return this.afdb.object(`exercises/${this.uid}/${key}`).update(exercises);
  }

}