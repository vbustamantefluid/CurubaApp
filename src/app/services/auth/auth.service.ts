import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { registerFail, registerSuccess } from 'src/store/register/register.actions';
import { UserService } from './users.service';
import { loginSuccess } from 'src/store/login/login.actions';

@Injectable({ providedIn: 'root' }) export class AuthService {

  constructor(
    private store: Store<AppState>,
    private auth: AngularFireAuth,
    private userService: UserService
  ){}

  register(user: User){
    setTimeout(() => {
      this.auth.createUserWithEmailAndPassword(user.mail, user.password)
      .then((firebaseUser: firebase.default.auth.UserCredential) => {
        user.id = firebaseUser.user.uid
        user.photoUrl = firebaseUser.user.photoURL;
        this.userService.users.push(user);
        this.userService.addUser(user);
        this.store.dispatch(registerSuccess())
        this.store.dispatch(loginSuccess({user}))
      }).catch(error =>  of(this.store.dispatch(registerFail({error: error}))));        
    }, 1000);
  }

  recovermailPassword(mail: string): Observable<void>{
    return new Observable<void>(observer => {
      this.auth.sendPasswordResetEmail(mail).then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  login(mail: string, password: string): Observable<User> {
    return new Observable<User>(observer => {
      this.auth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(() => {
        this.auth.signInWithEmailAndPassword(mail, password)
          .then((firebaseUser: firebase.default.auth.UserCredential) => {
            let user = this.userService.users.find(user => user.id === firebaseUser.user.uid)
            observer.next(user);
            observer.complete();
        }).catch(error => {
          observer.error(error);
          observer.complete();
        });
      });
    });
  }

}
