import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class DataStorageService {
  private endpointBase = 'https://udemy-max.firebaseio.com';
  private endpointAll = `${this.endpointBase}/.json`;
  private endpointRecipes = `${this.endpointBase}/recipes.json`;
  private endpointShoppingList = `${this.endpointBase}/shoppingList.json`;

  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
  ) {}

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get(this.endpointRecipes)
      .map(resp => resp.json())
      .map(resp => (resp || []).map(Recipe.fromJson))
      .map(recipes => {
        this.recipeService.setList(recipes);
        return recipes;
      });
  }

  saveRecipes() {
    return this.http.put(this.endpointRecipes, this.recipeService.getRecipes());
  }

  fetchShoppingList(): Observable<Ingredient[]> {
    return this.http
      .get(this.endpointShoppingList)
      .map(resp => resp.json())
      .map(resp => (resp || []).map(Ingredient.fromJson))
      .map(shoppingList => {
        this.shoppingListService.setList(shoppingList);
        return shoppingList;
      });
  }

  saveShoppingList() {
    return this.http.put(
      this.endpointShoppingList,
      this.shoppingListService.getList(),
    );
  }

  saveAll() {
    return this.http.put(this.endpointAll, {
      recipes: this.recipeService.getRecipes(),
      shoppingList: this.shoppingListService.getList(),
    });
  }

  fetchAll(): Observable<{ recipes: Recipe[]; shoppingList: Ingredient[] }> {
    return this.http
      .get(this.endpointAll)
      .map(resp => resp.json())
      .map(resp => ({
        recipes: resp.recipes.map(Recipe.fromJson),
        shoppingList: (resp.shoppingList || []).map(Ingredient.fromJson),
      }))
      .map(data => {
        this.recipeService.setList(data.recipes);
        this.shoppingListService.setList(data.shoppingList);
        return data;
      });
  }
}