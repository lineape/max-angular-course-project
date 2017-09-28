import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    children: [
      {
        component: RecipeStartComponent,
        path: '',
      },
      {
        canActivate: [AuthGuard],
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
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
  providers: [AuthGuard],
})
export class RecipeRoutingModule {}
