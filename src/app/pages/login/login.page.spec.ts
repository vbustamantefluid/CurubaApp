import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule, NavController, ToastController } from "@ionic/angular";
import { LoginPage } from "./login.page"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from "@ngrx/store";
import { loginReducer } from "src/store/login/login.reducer";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing"
import { AppState } from "src/store/AppState";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "src/store/login/login.actions";
import { loadingReducer } from "src/store/loading/loading.reducers";
import { User } from "src/app/models/user";
import { DOMHelper } from "src/test/domHelper";
import { ErrorMessageModule } from "src/app/components/error-message/error-message.module";

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let store: Store<AppState>;
  let toastController: ToastController;
  let dh: DOMHelper<LoginPage>;
  let navMock: any;

  beforeEach((() => {
    navMock = jasmine.createSpyObj('NavMock', ['navigateRoot']);

    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ErrorMessageModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('login', loginReducer),
        StoreModule.forFeature('loading', loadingReducer)
      ],
      providers: [
        { provide: NavController, useValue: navMock },
      ]
    });
    fixture = TestBed.createComponent(LoginPage);
    dh = new DOMHelper(fixture);
    store = TestBed.inject(Store);
    toastController = TestBed.inject(ToastController);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create form on init', () => {
    expect(component.form).not.toBeUndefined();
  });

  it('should go to register page on click register',() => {
    let router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover password on forgot password', () => {
    component.form.get('mail').setValue('valid@mail.com');
    dh.doClick('#recoverPasswordButton', 1)

    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTrue();
    });
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTrue();
    });
  });

  it('given user is recovering password, when success, then hide loading and show success message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    store.dispatch(recoverPassword({ mail: 'valid@mail.com' }));
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalse();
    });

    expect(toastController.create).toHaveBeenCalledTimes(1); 
  });

  it('given user is recovering password, when fail, then hide loading and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    store.dispatch(recoverPassword({ mail: 'invalid.com' }));
    store.dispatch(recoverPasswordFail({ error: 'message' }));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalse();
    });

    expect(toastController.create).toHaveBeenCalledTimes(1);
  });

  it('should show loading and start loading when logging in', () => {
    component.form.get('mail').setValue('valid@mail.com');
    component.form.get('password').setValue('anyPassword');
    dh.doClick('#loginButton', 1)

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTrue();
    });
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTrue();
    });
  });

  it('given user is loggin in, when success, then hide loading and send user to home page',  () => {
    store.dispatch(login({mail: 'valid@mail.com', password: 'anypassword'}));
    store.dispatch(loginSuccess({ user: new User() }));
    
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalse();
    });
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTrue();
    });
    expect(navMock.navigateRoot).toHaveBeenCalledWith('tabs/produccion');
  });

  it('given user is loggin in, when fail, then hide loading and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    store.dispatch(login({mail: 'invalid', password: 'anypassword'}));
    store.dispatch(loginFail({ error: {message: 'error message' }}));
    
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalse();
    });
    
    expect(toastController.create).toHaveBeenCalledTimes(1);
  });

});