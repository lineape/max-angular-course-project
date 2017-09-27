import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class IsNotAuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route, state): Promise<boolean> {
    if (await this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
