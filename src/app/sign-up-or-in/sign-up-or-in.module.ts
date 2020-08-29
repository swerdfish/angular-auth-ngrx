import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpOrInRoutingModule } from './sign-up-or-in-routing.module';
import { StatusComponent } from './status/status.component';
import { AuthGuardService } from '../core/auth-guard.service';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    StatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SignUpOrInRoutingModule
  ],
  providers: [
    AuthGuardService
  ]
})
export class SignUpOrInModule { }
