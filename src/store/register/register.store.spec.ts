import { register, registerFail, registerSuccess } from "./register.actions";
import { registerReducer } from "./register.reducer";
import { RegisterInitialState } from "./RegisterState"

describe('Register store', () => {

  it('register', () => {
    const initialState = { 
      ...RegisterInitialState 
    };
    const newState = registerReducer(initialState, register());

    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRegistered: false,
      registering: true
    });
  });

  it('registerSuccess', () => {
    const initialState = { 
      ...RegisterInitialState,
      registering: true
    };
    const newState = registerReducer(initialState, registerSuccess());

    expect(newState).toEqual({
      ...initialState,
      isRegistered: true,
      registering: false
    });
  });

  it('registerFail', () => {
    const initialState = { 
      ...RegisterInitialState,
      registering: true
    };
    const error = { error: 'anyerror' }
    const newState = registerReducer(initialState, registerFail({error}));

    expect(newState).toEqual({
      ...initialState,
      error,
      isRegistered: false,
      registering: false
    });
  });

})