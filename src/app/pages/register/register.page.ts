import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonInput, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { register } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/RegisterState';
import { RegisterPageForm } from './register.page.form';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  @ViewChild('autocomplete') autocomplete: IonInput;

  registerForm: RegisterPageForm;
  registerStateSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
  ){}

  ngOnInit(){
    this.registerForm = new RegisterPageForm(this.formBuilder);

    this.registerStateSubscription = this.store.select('register').subscribe(state => {
      this.toggleLoading(state);
      if(state.error) this.onError(state.error.message);
    });
  }

  ngOnDestroy(): void {
    this.registerStateSubscription.unsubscribe();
  }

  register(){
    this.registerForm.getForm().markAllAsTouched();

    if(this.registerForm.getForm().valid){
      this.store.dispatch(register());
      this.authService.register(this.registerForm.getForm().value as User)
    }
  }

  private onError(message: string){
    this.toastController.create({
      message: message,
      duration: 8000,
      header: 'Carga fallida'
    }).then(toast => toast.present());
  }

  private toggleLoading(state: RegisterState){
    if(state.registering) this.store.dispatch(show());
    else this.store.dispatch(hide());
  }

}
