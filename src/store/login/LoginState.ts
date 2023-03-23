import { User } from "src/app/models/user";

export interface LoginState {
    error: any;
    isRecoveringPassword: boolean;
    isRecoveredPassword: boolean;
    isLoggingIn: boolean;
    isLoggedIn: boolean;
    user: User
}

export const LoginInitialState: LoginState = {
    error: null,
    isRecoveringPassword: false,
    isRecoveredPassword: false,
    isLoggingIn: false,
    isLoggedIn: false,
    user: null
}



