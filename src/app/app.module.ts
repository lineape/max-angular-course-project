import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './header/header.component';
import { RecipeModule } from './recipes/recipe.module';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HeaderComponent, HomeComponent],
  imports: [
    AuthModule,
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    RecipeModule,
    ShoppingListModule,
    SharedModule,
  ],

  providers: [
    AuthService,
    DataStorageService,
    RecipeService,
    ShoppingListService,
  ],
})
export class AppModule {}
