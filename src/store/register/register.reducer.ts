import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppState";
import { register, registerFail, registerSuccess } from "./register.actions";
import { RegisterState } from "./RegisterState";

const initialState: RegisterState = AppInitialState.register;

const reducer = createReducer(initialState,

    on(register , currentState => {
        return {
            ...currentState,
            error: null,
            registering: true,
            isRegistered: false
        }     
    }),
    on(registerSuccess, currentState => {
        return {
            ...currentState,
            registering: false, 
            isRegistered: true
        }
    }),
    on(registerFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            registering: false
        } 
    })
)


export function registerReducer(state: RegisterState, action){
    return reducer(state, action);
}