import { LoadingInitialState, LoadingState } from "./loading/LoadingState";
import { LoginInitialState, LoginState } from "./login/LoginState";
import { RegisterInitialState, RegisterState } from "./register/RegisterState";

export interface AppState {
    loading: LoadingState;
    login: LoginState;
    register: RegisterState
}

export const AppInitialState: AppState = {
    loading: LoadingInitialState, 
    login: LoginInitialState,
    register: RegisterInitialState
}
