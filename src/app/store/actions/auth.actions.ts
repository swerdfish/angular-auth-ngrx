import { Action } from '@ngrx/store';
import { Credentials } from '../payloads/credentials.model';
import { UserToken } from '../payloads/user-token.model';


export enum AuthActionTypes {
    GET_STATUS = '[Auth] GetStatus',
    INVALIDATE_TOKEN = '[Auth] InvalidateToken',
    SIGNIN = '[Auth] SignIn',
    SIGNIN_PROMPT = '[Auth] SignIn Prompt',
    SIGNIN_SUCCESS = '[Auth] SignIn Success',
    SIGNIN_FAILURE = '[Auth] SignIn Failure',
    SIGNUP = '[Auth] SignUp',
    SIGNUP_SUCCESS = '[Auth] SignUp Success',
    SIGNUP_FAILURE = '[Auth] SignUp Failure',
    SIGNOUT = '[Auth] SignOut'
}

export class GetStatus implements Action {
    readonly type: string = AuthActionTypes.GET_STATUS;
    constructor(public payload: void) { }
}

export class InvalidateToken implements Action {
    readonly type: string = AuthActionTypes.INVALIDATE_TOKEN;
    constructor(public payload: void) { }
}

export class SignIn implements Action {
    readonly type: string = AuthActionTypes.SIGNIN;
    constructor(public payload: Credentials) { }
}

export class SignInSuccess implements Action {
    readonly type: string = AuthActionTypes.SIGNIN_SUCCESS;
    constructor(public payload: UserToken) { }
}

export class SignInFailure implements Action {
    readonly type: string = AuthActionTypes.SIGNIN_FAILURE;
    constructor(public payload: any) { }
}

export class SignUp implements Action {
    readonly type: string = AuthActionTypes.SIGNUP;
    constructor(public payload: Credentials) { }
}

export class SignUpSuccess implements Action {
    readonly type: string = AuthActionTypes.SIGNUP_SUCCESS;
    constructor(public payload: UserToken) { }
}

export class SignUpFailure implements Action {
    readonly type: string = AuthActionTypes.SIGNUP_FAILURE;
    constructor(public payload: any) { }
}

export class SignOut implements Action {
    readonly type: string = AuthActionTypes.SIGNOUT;
    constructor(public payload: void) { }
}

export type All =
    | GetStatus | InvalidateToken
    | SignIn | SignInSuccess | SignInFailure
    | SignUp | SignUpSuccess | SignUpFailure
    | SignOut;