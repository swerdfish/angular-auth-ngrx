import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthState, AppState } from '../store/app.states';
import { InvalidateToken } from '../store/actions/auth.actions';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  getState: Observable<any>;
  isAuthenticated: boolean;

  constructor(
    public auth: AuthService,
    public router: Router,
    public store: Store) {
    this.getState = this.store.select(selectAuthState);
    // this.store.select(selectAuthState).subscribe(
    //   appState => this.isAuthenticated = appState.authState.isAuthenticated);
  }

  canActivate(): boolean {
    let result: boolean;
    // this.store.select(selectAuthState).subscribe(
    this.getState.subscribe(
      state => {
        let isAuthed = state.isAuthenticated;
        if (this.auth.getToken() && isAuthed) {
          console.log(isAuthed);
          result = true;
        } else {
          console.log(isAuthed);
          this.router.navigateByUrl('/sign-in');
          let token = this.auth.getToken();
          console.log(token);
          if (token) {
            console.log("Token should be truthy");
            console.log("Token: " + token);
            this.store.dispatch(new InvalidateToken());
          }
          result = false;
        }
      }
    );
    console.log(result);
    return result;
    // if (this.auth.getToken() && this.isAuthenticated) {
    //   console.log(this.isAuthenticated);
    //   return true;
    // } else {
    //   console.log(this.isAuthenticated);
    //   this.router.navigateByUrl('/sign-in');
    //   if (this.auth.getToken()) this.store.dispatch(new InvalidateToken());
    //   return false;
    // }
  }

}
