import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppState";
import * as action from "./login.actions";
import { LoginState } from "./LoginState";

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(
    initialState,
    on(action.recoverPassword, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoveringPassword: true,
        } 
    }),
    on(action.recoverPasswordSuccess, currentState => {
        return {
            ...currentState,
            isRecoveringPassword: false,
            isRecoveredPassword: true,
        }     
    }),
    on(action.recoverPasswordFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isRecoveringPassword: false,
        } 
    }),
    on(action.login, currentState => {
        return {
            ...currentState,
            error: null,
            isLoggingIn: true,
        }
    }),
    on(action.loginSuccess, (currentState, action) => {
        return {
            ...currentState,
            isLoggingIn: false,
            isLoggedIn: true,
            user: action.user,
        }
    }),
    on(action.loginFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isLoggingIn: false,
        }
    }),
)

export function loginReducer(state: LoginState, action){
    return reducer(state, action);
}