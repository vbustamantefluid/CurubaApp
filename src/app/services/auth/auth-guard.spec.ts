import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Store, StoreModule } from "@ngrx/store";
import { User } from "src/app/models/user";
import { AppState } from "src/store/AppState";
import { loginSuccess } from "src/store/login/login.actions";
import { loginReducer } from "src/store/login/login.reducer";
import { AuthGuard } from "./auth-guard"


describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: Store<AppState>;
  let router: Router;
  let routerMock: any;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('login', loginReducer),
      ],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  it('should allow looged user to access page', () => {
    store.dispatch(loginSuccess({user: new User() }))

    guard.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeTrue();
    });
  });

  it('should not allow acces to access page if user is not logged in', () => {
    guard.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeFalse();
    });
  });

  it('should not allowed user be set to the login page', () => {
    guard.canLoad().subscribe(() => {
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('login');
    })
  })

});