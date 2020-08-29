import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { SignOut } from '../../store/actions/auth.actions';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { selectAuthState } from 'src/app/store/app.states';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: boolean;
  user: User;
  errorMessage: string;

  constructor(private store: Store) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    })
  }

  signOut(): void {
    this.store.dispatch(new SignOut());
  }

}
