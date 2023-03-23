import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/AppState';
import * as loadingActions from 'src/store/loading/loading.actions';
import * as loginActions from 'src/store/login/login.actions';
import { LoginState } from 'src/store/login/LoginState';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup;
  loginStateSubscription: Subscription;

  constructor(
    private navController: NavController,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
  ){}

  ngOnInit(){
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);
      this.onIsLoggedIn(loginState);
      this.onError(loginState);
      this.toggleLoading(loginState);
    });
  }

  ngOnDestroy(): void {
    this.loginStateSubscription.unsubscribe();
  }

  private toggleLoading(loginState: LoginState){
    if(loginState.isLoggingIn || loginState.isRecoveringPassword){
      this.store.dispatch(loadingActions.show());
    } else {
      this.store.dispatch(loadingActions.hide());
    }
  }

  private onIsLoggedIn(loginState: LoginState){
    if(loginState.isLoggedIn) this.navController.navigateRoot('tabs/produccion')
  }

  private async onError(loginState: LoginState){
    if(loginState.error){
      const toaster = await this.toastController.create({
        position: 'bottom',
        duration: 4000,
        message: loginState.error.message,
        color: 'danger'
      });
      toaster.present();
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState){
    if(loginState.isRecoveredPassword){
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: 'Mensaje enviado',
        duration: 3000,
        color: 'primary'
      });
      toaster.present();
    }
  }

  forgotmailPassword(){
    this.store.dispatch(loginActions.recoverPassword({mail: this.form.get('mail').value}))
  }

  login(){
    this.store.dispatch(loginActions.login({
      mail: this.form.get('mail').value,
      password: this.form.get('password').value
    }));
  }

  register(){
    this.router.navigate(['register']);
  }
  
}
