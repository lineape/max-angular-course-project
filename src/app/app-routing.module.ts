import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsAuthenticatedGuard } from './auth/is-authenticated-guard.service';
import { IsNotAuthenticatedGuard } from './auth/is-not-authenticated-guard.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipes',
  },
  {
    children: [
      {
        component: RecipeStartComponent,
        path: '',
        pathMatch: 'full',
      },
      {
        canActivate: [IsAuthenticatedGuard],
        component: RecipeEditComponent,
        path: 'new',
      },
      {
        component: RecipeDetailComponent,
        path: ':id',
      },
      {
        component: RecipeEditComponent,
        path: ':id/edit',
      },
    ],
    component: RecipesComponent,
    path: 'recipes',
  },
  {
    component: ShoppingListComponent,
    path: 'shopping-list',
  },
  {
    canActivate: [IsNotAuthenticatedGuard],
    component: SigninComponent,
    path: 'auth/signin',
  },
  {
    canActivate: [IsNotAuthenticatedGuard],
    component: SignupComponent,
    path: 'auth/signup',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [IsAuthenticatedGuard, IsNotAuthenticatedGuard],
})
export class AppRoutingModule {}
