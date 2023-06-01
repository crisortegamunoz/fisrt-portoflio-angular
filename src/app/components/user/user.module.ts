import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from '../../material/material.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MaterialModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ]
})
export class UserModule { }
