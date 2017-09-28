import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route, state): Promise<boolean> {
    return this.isNotAuthenticated();
  }

  canLoad(): Promise<boolean> {
    return this.isNotAuthenticated();
  }

  private async isNotAuthenticated(): Promise<boolean> {
    if (await this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
