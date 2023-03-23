import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { LoginEffects } from "./login.effects";
import { provideMockActions} from '@ngrx/effects/testing'
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/app/models/user";

describe('Login effects', () => {
  let effects: LoginEffects;
  let actions$: Observable<Action>;
  let error = { error: 'error' };
  let user = new User();
  user.id = 'anyUserId';

  let authServiceMock = {
    recovermailPassword: (mail: string) => {
      if (mail == 'error@mail.com') return throwError(error);
      return of({});
    },
    login: (mail: string, password: string) => {
      if (mail == "error@mail.com") return throwError(error);
      return of(user);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ LoginEffects ])
      ],
      providers: [
        provideMockActions(() => actions$)
      ]
    }).overrideProvider(AuthService, { useValue: authServiceMock });

    effects = TestBed.inject(LoginEffects);
  });

  it('should recover passwrod with existing mail return success', done => {
    actions$ = of(recoverPassword({ mail: 'valid@mail.com' }));

    effects.recoverPassword$.subscribe(newAction => {
      expect(newAction).toEqual(recoverPasswordSuccess());
      done();
    })
    done();
  });

  it('should recover passwrod with not existing mail return error', done => {
    actions$ = of(recoverPassword({ mail: 'error@mail.com' }));

    effects.recoverPassword$.subscribe(newAction => {
      expect(newAction).toEqual(recoverPasswordFail({ error }));
      done();
    })
    done();
  });

  it('should login with valid credentials return success', done => {
    actions$ = of(login({ mail: 'valid@mail.com', password: 'anyPassword' }));

    effects.login$.subscribe(newAction => {
      expect(newAction).toEqual(loginSuccess({ user }));
      done();
    });
  });

  it('should login with invalid credentials return error', done => {
    actions$ = of(login({ mail: 'error@mail.com', password: 'anyPassword' }));

    effects.login$.subscribe(newAction => {
      expect(newAction).toEqual(loginFail({ error }));
      done();
    });
  });
});