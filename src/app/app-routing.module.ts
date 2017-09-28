import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth-routing.module';
import { HomeComponent } from './home/home.component';
import { RecipeRoutingModule } from './recipes/recipe-routing.module';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: ShoppingListComponent, path: 'shopping-list' },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    AuthRoutingModule,
    RecipeRoutingModule,
    RouterModule.forRoot(routes),
  ],
})
export class AppRoutingModule {}
