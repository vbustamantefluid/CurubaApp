export interface RegisterState {
    error: any;
    registering: boolean;
    isRegistered: boolean;
}

export const RegisterInitialState: RegisterState = {
    error: null,
    registering: false,
    isRegistered: false,
}