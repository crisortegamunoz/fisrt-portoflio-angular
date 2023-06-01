import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: UserService, private router: Router) {

  }
  
  canActivate(): Observable<boolean> {
    return this.authService.userData$
      .pipe(map(user => {
          if (!user) {
            this.router.navigate(['auth/login']);
            return false;
          } 
          return true;
      })
    );

  }
  
}
