import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { tap } from "rxjs/operators";

import { Store } from "store";

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {
  auth$ = this.afa.authState.pipe(
    tap(next => {
      if (!next) {
        this.store.set("user", null);
        return;
      }
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      };
      this.store.set("user", user);
    })
  );

  constructor(private store: Store, private afa: AngularFireAuth) {}

  get authState() {
    return this.afa.authState;
  }

  get user() {
    return this.afa.auth.currentUser;
  }

  createUser(email: string, password: string) {
    return this.afa.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.afa.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.afa.auth.signOut();
  }
}
