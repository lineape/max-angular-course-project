import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  authChanged = new Subject<firebase.User>();
  private user: firebase.User;
  constructor(private router: Router) {
    firebase.initializeApp({
      apiKey: 'AIzaSyBpZTV_3jdeVZLSwwQeZcqcRT6mCBVkE40',
      authDomain: 'udemy-max.firebaseapp.com',
    });
    firebase.auth().onAuthStateChanged(this.onAuthStateChange);
  }

  signUp = (email: string, password: string) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['/recipes']));

  signIn = (email: string, password: string) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['/recipes']));

  signOut = () =>
    firebase
      .auth()
      .signOut()
      .then(() => this.router.navigate(['/recipes']));

  getToken = (): firebase.Promise<string> =>
    firebase.auth().currentUser.getIdToken();

  isAuthenticated = (): Promise<boolean> =>
    new Promise(resolve => {
      if (this.user !== undefined) {
        resolve(!!this.user);
      } else {
        const authSub = this.authChanged.subscribe((user: firebase.User) => {
          authSub.unsubscribe();
          resolve(!!user);
        });
      }
    });

  private onAuthStateChange = (user: firebase.User) => {
    this.user = user;
    this.authChanged.next(user);
  };
}
