import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule, ToastController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth/auth.service";
import { DOMHelper } from "src/test/domHelper";
import { RegisterPage } from "./register.page"

import { Store, StoreModule } from "@ngrx/store";
import { AppState } from "src/store/AppState";
import { loadingReducer } from "src/store/loading/loading.reducers";
import { loginReducer } from "src/store/login/login.reducer";
import { register, registerFail, registerSuccess } from "src/store/register/register.actions";
import { registerReducer } from "src/store/register/register.reducer";
import { ErrorMessageModule } from "src/app/components/error-message/error-message.module";

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let store: Store<AppState>;
  let toastController: ToastController;
  let dh: DOMHelper<RegisterPage>;
  let authServiceMock: any;

  beforeEach((() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['register']);

    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        ErrorMessageModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('register', registerReducer),
        StoreModule.forFeature('login', loginReducer),
        StoreModule.forFeature('loading', loadingReducer)
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
    fixture = TestBed.createComponent(RegisterPage);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  }));

  it('should create form on init', () => {
    expect(component.registerForm).not.toBeUndefined();
  });

  it('should be at least one ion-button tag', () => {
    expect(dh.count('ion-button')).toBeGreaterThanOrEqual(1);
  });

  it('should NOT be allowed to register with form invalid', () => {
    dh.doClick('ion-button', 1);

    store.select('register').subscribe(state => {
      expect(state.registering).toBeFalse();
    });
  });

  it('given form is valid, when click on register, then register', () => {
    fillForm();
    dh.doClick('ion-button', 1);

    store.select('register').subscribe(state => {
      expect(state.registering).toBeTrue();
    });
  });

  it('given form is valid, when click on register, then show loading', () => {
    fillForm();
    dh.doClick('ion-button', 1);

    store.select('loading').subscribe(state => {
      expect(state.show).toBeTrue();
    });
  });

  it('should hide loading when regisration is successful', () => {
    store.dispatch(register());
    store.dispatch(registerSuccess());

    store.select('loading').subscribe(state => {
      expect(state.show).toBeFalse();
    });
  });

  it('should hide loading when regisration fails', () => {
    store.dispatch(register());
    store.dispatch(registerFail({ error: { message: 'any message'} }));

    store.select('loading').subscribe(state => {
      expect(state.show).toBeFalse();
    });
  });

  it('should show an error when regisration fails', () => {
    toastController = TestBed.inject(ToastController);
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}))

    store.dispatch(register());
    store.dispatch(registerFail({ error: { message: 'any message'} }));

    expect(toastController.create).toHaveBeenCalled();
  });


  function fillForm() {
    let form = component.registerForm.getForm();

    form.get('name').setValue('name');
    form.get('mail').setValue('valid@mail.com');
    form.get('password').setValue('password');
    form.get('repeatPass').setValue('password');
    form.get('phone').setValue('123456');
    form.get('address').get('street').setValue('street');
    form.get('address').get('number').setValue('1234');
    form.get('address').get('zipCode').setValue('zipCode');
    form.get('address').get('state').setValue('state');
    form.get('address').get('neighborhood').setValue('neighborhood');
    form.get('address').get('city').setValue('city');
  }

});