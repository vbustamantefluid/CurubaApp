import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { User } from '../../models/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { loginSuccess } from 'src/store/login/login.actions';

@Injectable({ providedIn: 'root' }) export class UserService {

  Users = this.cloud.firestore.collection('users');
  user: firebase.User;
  user$ = {} as User;
  users = [] as User[];

  chargingPhoto = false;
  file: File = null;
  photoSel: string | ArrayBuffer = null;

  constructor(
    private store: Store<AppState>,
    private storage: AngularFireStorage,
    private cloud: AngularFirestore,
    private afAuth: AngularFireAuth
  ){
    this.store.select('login').subscribe(loginState => {
      this.user$ = loginState.user;
    })
  }

  isLogged(){
    return this.user ? true : false;
  }

  logout(){ 
    this.afAuth.signOut();
  }

  getUsers(){
    this.cloud.firestore.collection('users').onSnapshot(userSnapShot => {
      userSnapShot.docChanges().forEach(change => {
        let user = change.doc.data() as User;
        let index = this.users.findIndex(us => us.id === user.id);
        if(change.type === 'added' && index === -1) this.users.push(user);
        if(change.type === 'modified') this.users.splice(index, 1, user);
        if(change.type === 'removed') this.users.splice(index, 1);        
      });
    });
  }

  addUser(user: User){ 
    user.id = Date.now().toString();
    this.Users.doc(user.id).set(user).then().catch(err => console.log(err));
  }

  updateUser(user: User){
    this.Users.doc(user.id).update(user).then(message => console.log(message)).catch(err => console.log(err));
  }

  insertProfPhoto(file: File){
    const Path = this.storage.storage.ref('profPhoto/' + this.user$.id);
    Path.put(file).then(() => {
      Path.getDownloadURL().then((url) => { 
        this.chargingPhoto = false;
        this.user$.photoUrl = url;
        this.store.dispatch(loginSuccess({user: this.user$}))
        this.updateUser(this.user$);
      }) 
    })
  }

  deleteUser(user: User){
    if(user.photoUrl !== '') this.delPhoto(user)
    this.Users.doc(user.id).delete().then(message => console.log(message)).catch(err => console.log(err));
  }

  delPhoto(user:User){
    this.storage.storage.ref('profPhoto/' + user.id).delete()
    .then(message => console.log(message)).catch(error => console.log(error));
  }
  
}
