import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SignUpOrInModule } from './sign-up-or-in/sign-up-or-in.module';

import { AuthEffects } from './store/effects/auth.effects';
import { reducers } from './store/app.states';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    EffectsModule.forRoot([
      AuthEffects
    ]),
    SharedModule,
    SignUpOrInModule,
    StoreModule.forRoot(reducers, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
