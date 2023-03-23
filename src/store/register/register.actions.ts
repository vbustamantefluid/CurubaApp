import { createAction, props } from "@ngrx/store";

export const register = createAction('[Register]');
export const registerSuccess = createAction("[Register] success");
export const registerFail = createAction("[Register] fail", props<{error: any}>());
