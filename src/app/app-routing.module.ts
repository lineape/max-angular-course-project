import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { component: HomeComponent, path: '' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'recipes', loadChildren: './recipes/recipe.module#RecipeModule' },
  {
    loadChildren: './shopping-list/shopping-list.module#ShoppingListModule',
    path: 'shopping-list',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
