import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as loginActions from "./login.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth/auth.service";
import { of } from "rxjs";

@Injectable() export class LoginEffects {

    constructor(
        private authService: AuthService,
        private actions$: Actions
    ){}

    recoverPassword$ = createEffect(() => this.actions$.pipe(
        ofType(loginActions.recoverPassword),
        switchMap((payload: {mail: string}) => this.authService.recovermailPassword(payload.mail).pipe(
            map(() => loginActions.recoverPasswordSuccess()),
            catchError(error => of(loginActions.recoverPasswordFail({error})))
        ))
    ));


    login$ = createEffect(() => this.actions$.pipe(
        ofType(loginActions.login),
        switchMap((payload: {mail: string, password: string}) => this.authService.login(payload.mail, payload.password).pipe(
            map(user => loginActions.loginSuccess({user})),
            catchError(error => of(loginActions.loginFail({error})))
        ))
    ));

}
