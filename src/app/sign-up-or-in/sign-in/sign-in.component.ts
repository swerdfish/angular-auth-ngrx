import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, selectAuthState } from '../../store/app.states';
import { SignIn } from '../../store/actions/auth.actions';
import { User } from 'src/app/shared/models/user.model';
import { Credentials } from 'src/app/store/payloads/credentials.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe(state => {
      this.errorMessage = state.errorMessage;
    })
  }

  onSubmit(): void {
    const payload: Credentials = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new SignIn(payload))
  }

}
