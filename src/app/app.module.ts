import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { SharedModule } from './shared/shared.module';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HeaderComponent, HomeComponent],
  imports: [AppRoutingModule, BrowserModule, HttpModule, SharedModule],

  providers: [
    AuthService,
    DataStorageService,
    RecipeService,
    ShoppingListService,
  ],
})
export class AppModule {}
