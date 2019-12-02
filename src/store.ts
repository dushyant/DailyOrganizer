import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged, pluck } from "rxjs/operators";

import { User } from "./auth/shared/services/auth/auth.service";
import { Meal } from './dayorganizer/shared/services/meals/meals.service';
import { Exercise } from './dayorganizer/shared/services/exercises/exercises.service';
import { Task } from './dayorganizer/shared/services/mytasks/mytasks.service';

import { DayItem } from './dayorganizer/shared/services/myday/myday.service';

export interface State {
  user: User,
  meals: Meal[],
  exercises: Exercise[],
  tasks: Task[],
  myday: DayItem[],
  selected: any,
  list: any,
  date: Date,
  [key: string]: any
}

const state: State = {
  user: undefined,
  meals: undefined,
  exercises: undefined,
  tasks: undefined,
  myday: undefined,
  selected: undefined,
  list: undefined,
  date: undefined
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
