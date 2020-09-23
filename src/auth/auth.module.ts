import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AngularFireModule, FirebaseAppConfig } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";

// shared module
import { SharedModule } from "./shared/shared.module";

export const ROUTES: Routes = [
  {
    path: "auth",
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "login"
      },
      {
        path: "login",
        loadChildren: () => import('./login/login.module').then( m => m.LoginModule)
      },
      {
        path: "register",
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      }
    ]
  }
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyCxfZNw57HyDEjEOB-Pp0zonbONfJJHrRU",
  authDomain: "my-day-organizer.firebaseapp.com",
  databaseURL: "https://my-day-organizer.firebaseio.com",
  projectId: "my-day-organizer",
  storageBucket: "my-day-organizer.appspot.com",
  messagingSenderId: "933526123695",
  appId: "1:933526123695:web:e1e7bf1b5355e7ab35105a",
  measurementId: "G-G99BZZ3HBG"
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {}
