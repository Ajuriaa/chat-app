import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.findToken()) {
      return true;
    }

    this._router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return true;
  }

  public findToken(): boolean {
    const cookies = document.cookie.split('; ');
    for (const c of cookies) {
      if (c.indexOf('AJU-TOKEN=') === 0) {
        return true;
      }
    }
    return false;
  }
}
