import { createAction, props } from "@ngrx/store";
import { User } from "../../app/models/user";

export const recoverPassword = createAction("[Recover password]", props<{mail: string}>());
export const recoverPasswordSuccess = createAction("[Recover password] success");
export const recoverPasswordFail = createAction("[Recover password] fail", props<{error: any}>());

export const login = createAction("[Login]", props<{mail: string, password: string}>());
export const loginSuccess = createAction('[Login] success', props<{user: User}>());
export const loginFail = createAction('[Login] fail', props<{error: any}>());

