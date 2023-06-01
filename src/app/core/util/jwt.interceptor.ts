import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpResponse, HttpErrorResponse, HttpRequest }  from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserService } from '../services/user/user.service';
import Swal from 'sweetalert2';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private router: Router, private userService: UserService) {

    }

    intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = '';
        
        if (this.userService.isUserLogged() && req.method !== 'GET') {
            token = `Bearer ${this.userService.getUserToken()}`;
        } else if (!this.userService.isUserLogged() && req.method !== 'GET' && !req.url.includes('auth/authenticate')) {
            Swal.fire('What do you do here?!', `If you are watching this, you don't have permission to be here.`, 'warning'); 
            this.router.navigate(['/auth/login']);
        }

        req = req.clone({
            setHeaders: {
                Authorization: `${token}`
            }
        });

        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                        //console.log(event);
                } 
            }, (err:any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                            this.router.navigate(['/auth/login']);
                    }
                }
            })
        );

    }

}
