import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotAuthGuard } from './not-auth-guard.service';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    canActivate: [NotAuthGuard],
    component: SigninComponent,
    path: 'signin',
  },
  {
    canActivate: [NotAuthGuard],
    component: SignupComponent,
    path: 'signup',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
  providers: [NotAuthGuard],
})
export class AuthRoutingModule {}
