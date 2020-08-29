import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Credentials } from 'src/app/store/payloads/credentials.model';
import { Store } from '@ngrx/store';
import { SignUp } from 'src/app/store/actions/auth.actions';
import { Observable } from 'rxjs';
import { selectAuthState } from 'src/app/store/app.states';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store) {
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
    this.store.dispatch(new SignUp(payload));
  }

}
