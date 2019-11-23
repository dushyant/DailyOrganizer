import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged, pluck } from "rxjs/operators";

import { User } from "./auth/shared/services/auth/auth.service";
import { Meal } from './dayorganizer/shared/services/meals/meals.service';
import { Exercise } from './dayorganizer/shared/services/exercises/exercises.service';

export interface State {
  user: User;
  meals: Meal[];
  exercise: Exercise[];
  [key: string]: any;
}

const state: State = {
  user: undefined,
  meals: undefined,
  exercise: undefined
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
