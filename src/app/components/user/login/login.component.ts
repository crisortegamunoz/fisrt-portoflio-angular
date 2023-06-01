import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';


import swal from 'sweetalert2'

import { User } from '../../../core/model/User';
import { AuthenticationRequest } from '../../../core/model/autentication-request';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit{

  form: FormGroup;
  captchaNotSelected: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: UserService) {
    this.captchaNotSelected = false;
    this.buildForm();
  }


  ngAfterViewInit(): void{
    
  }

  onLogin(form: User) {
    if (this.form.valid) {
      this.authService.login(form)
      .then(res => {
        const user: User = this.authService.getUser();
        const authenticationResponse: AuthenticationRequest = { username: user.username, password: user.password };
        this.authService.apiLogin(authenticationResponse).pipe(take(1)).subscribe(
          resp => {
            const jwt: string = resp.jwt;
            this.authService.userLogged(jwt);
            this.router.navigate(['/admin']);
          },
          error => {
            swal.fire('Ha Ocurrido un error', 'La contraseña ingresada no es válida', 'error');
          }
        );
      })
      .catch(error => {
          if (error.code === 'auth/wrong-password') {
            swal.fire('Ha Ocurrido un error', 'La contraseña ingresada no es válida', 'error');
          } else {
            swal.fire('Ha Ocurrido un error', 'Intente nuevamente, sí el problema persiste puede que el servicio no este funcionando.', 'error');
          }
      });
    }
  }

  resolved(captchaResponse: string) {
    
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required, Validators.email])
      ],
      password: ['', [Validators.required]],
      captcha: ['', [Validators.required]]
    });
  }

}
