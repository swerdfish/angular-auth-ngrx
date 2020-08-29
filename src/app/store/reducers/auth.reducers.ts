import { User } from '../../shared/models/user.model';
import { All, AuthActionTypes } from '../actions/auth.actions';

export interface State {
    // is a user authenticated
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
}

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.INVALIDATE_TOKEN: {
            return {
                ...state,
                isAuthenticated: false,
                errorMessage: localStorage.getItem('token') ? "Stale token detected. Please sign in again." : null
            }
        }
        case AuthActionTypes.SIGNIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    email: action.payload.email
                },
                errorMessage: null
            };
        }
        case AuthActionTypes.SIGNIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'Incorrect email and/or password'
            }
        }
        case AuthActionTypes.SIGNOUT: {
            return initialState;
        }
        case AuthActionTypes.SIGNUP_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    email: action.payload.email
                },
                errorMessage: null
            }
        }
        case AuthActionTypes.SIGNUP_FAILURE: {
            return {
                ...state,
                errorMessage: 'Cannot register new logins at this time'
            }
        }
        default: {
            return state;
        }
    }
}