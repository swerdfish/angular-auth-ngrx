import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { AuthService } from '../../core/auth.service';
import {
    AuthActionTypes,
    SignIn, SignInSuccess, SignInFailure,
    SignUp, SignUpSuccess, SignUpFailure
} from '../actions/auth.actions';
import { UserToken } from '../payloads/user-token.model';


@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router,
    ) { }

    @Effect({ dispatch: false })
    GetStatus: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.GET_STATUS),
        switchMap(() => {
            console.log("Get Status!");
            return this.authService.getStatus();
        })
    );

    @Effect({ dispatch: false })
    InvalidateToken: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.INVALIDATE_TOKEN),
        tap(() => {
            console.log("Invalidate Token!");
            localStorage.removeItem('token');
        })
    )

    @Effect()// dispatches SignInSuccess or SignInFailure
    SignIn: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNIN),
        map((action: SignIn) => action.payload),
        switchMap(payload => {
            console.log("Sign In!");
            /* 
             * Sends the payload to backend. If there's any error, it will assume 
             * the email and password are incorrect
             */
            return this.authService.signIn(payload.email, payload.password).pipe(
                map((user) => {
                    console.log(user);
                    return new SignInSuccess({ token: user.token, email: payload.email });
                }),
                catchError((error) => {
                    console.log(error);
                    return of(new SignInFailure({ error: error }));
                })
            )
        })
    );

    @Effect({ dispatch: false })// doesn't dispatch any further action
    SignInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNIN_FAILURE)
    );

    @Effect({ dispatch: false })// doesn't dispatch any further action
    SignInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNIN_SUCCESS),
        tap((action) => {
            console.log("Sign In Success");
            this.signInActions(action.payload)
            // localStorage.setItem('token', action.payload.token);
            // this.router.navigateByUrl('/');
        })
    );

    @Effect({ dispatch: false })
    SignOut: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNOUT),
        tap(() => {
            console.log("Sign Out");
            localStorage.removeItem('token');
        })
    );

    @Effect()
    SignUp: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP),
        map((action: SignUp) => action.payload),
        switchMap(payload => {
            console.log("Sign Up");
            return this.authService.signUp(payload.email, payload.password).pipe(
                map((user) => {
                    console.log(user);
                    return new SignUpSuccess({ token: user.token, email: payload.email });
                }),
                catchError((error) => {
                    console.log(error);
                    return of(new SignUpFailure({ error: error }));
                })
            );
        })
    );

    @Effect({ dispatch: false })
    SignUpFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_FAILURE)
    )

    @Effect({ dispatch: false })
    SignUpSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_SUCCESS),
        tap((action) => {
            console.log("Sign Up Success");
            this.signInActions(action.payload);
            // localStorage.setItem('token', action.payload.token);
            // this.router.navigateByUrl('/');
        })
    );

    signInActions(uToken: UserToken) {
        localStorage.setItem('token', uToken.token);
        this.router.navigateByUrl('/');
    }
}