import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {
  constructor(private provider: FirebaseService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve =>{
      this.provider.getAuth().onAuthStateChanged(user => {
        if(user)
          this.router.navigate(['tabs/tab1']);

        resolve(!user ? true : false);
      });
    });
  }  
}
