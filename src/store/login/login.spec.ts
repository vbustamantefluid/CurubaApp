import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { loginReducer } from "./login.reducer";
import { LoginInitialState, LoginState } from "./LoginState"

describe('Login store', () => {

  it('recoverPassword', () => {
    const initialState: LoginState = LoginInitialState;
    const newState = loginReducer(initialState, recoverPassword({ mail: 'mail@mail.com' }));
    expect(newState).toEqual({
      ...initialState,  
      error: null,
      isRecoveringPassword: true,
      isRecoveredPassword: false,
      isLoggingIn: false
    })
  });

  it('recoverPasswordSuccess', () => {
    const initialState: LoginState = {
      ...LoginInitialState,
      isRecoveringPassword: true
    };
    const newState = loginReducer(initialState, recoverPasswordSuccess());
    expect(newState).toEqual({
      ...initialState,  
      error: null,
      isRecoveringPassword: false,
      isRecoveredPassword: true,
      isLoggingIn: false
    })
  });

  it('recoverPasswordFail', () => {
    const initialState: LoginState = {
      ...LoginInitialState,
      isRecoveringPassword: true
    };
    const error = {error: 'error'}
    const newState = loginReducer(initialState, recoverPasswordFail({ error }));
    expect(newState).toEqual({
      ...initialState,  
      error,
      isRecoveringPassword: false,
      isRecoveredPassword: false,
      isLoggingIn: false
    });
  });

  it('login', () => {
    const initialState: LoginState = LoginInitialState;
    const newState = loginReducer(initialState, login({mail: 'valid@mail.com', password: '1234'}));
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true
    });
  });

  it('loginSuccess', () => {
    const initialState: LoginState = {
      ...LoginInitialState,
      isLoggingIn: true
    };
    const newState = loginReducer(initialState, loginSuccess({ user: null }));
    expect(newState).toEqual({
      ...initialState,
      error: null,
      isLoggedIn: true,
      isLoggingIn: false
    });
  });

  it('loginFail', () => {
    const initialState: LoginState = {
      ...LoginInitialState,
      isLoggingIn: true
    };
    const error = {error: 'error'}
    const newState = loginReducer(initialState, loginFail({ error }));
    expect(newState).toEqual({
      ...initialState,
      error,
      isLoggedIn: false,
      isLoggingIn: false
    });
  });


});