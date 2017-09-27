import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable()
export class DataStorageService {
  private endpointBase = 'https://udemy-max.firebaseio.com';
  private endpointRecipes = `${this.endpointBase}/recipes.json`;
  private endpointShoppingList = `${this.endpointBase}/shoppingList.json`;

  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private slService: ShoppingListService,
    private authService: AuthService,
  ) {
    this.authService.authChanged.subscribe(this.onAuthChange);
  }

  fetchRecipes = (token: string): Observable<Recipe[]> =>
    this.http
      .get(`${this.endpointRecipes}?auth=${token}`)
      .map(resp => resp.json())
      .map(resp => (resp || []).map(Recipe.fromJson))
      .map(recipes => {
        this.recipeService.setList(recipes);
        return recipes;
      });

  saveRecipes = (token: string) =>
    this.http.put(
      `${this.endpointRecipes}?auth=${token}`,
      this.recipeService.getList(),
    );

  fetchShoppingList = (token: string): Observable<Ingredient[]> =>
    this.http
      .get(`${this.endpointShoppingList}?auth=${token}`)
      .map(resp => resp.json())
      .map(resp => (resp || []).map(Ingredient.fromJson))
      .map(shoppingList => {
        this.slService.setList(shoppingList);
        return shoppingList;
      });

  saveShoppingList = (token: string) =>
    this.http.put(
      `${this.endpointShoppingList}?auth=${token}`,
      this.slService.getList(),
    );

  private onAuthChange = async (user: firebase.User) => {
    if (user) {
      this.fetchRecipes(await user.getIdToken()).subscribe();
    } else {
      this.recipeService.setList([]);
      this.slService.setList([]);
    }
  };
}
