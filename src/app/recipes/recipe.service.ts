import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
  private list: Recipe[] = [
    new Recipe(
      'Pepperoni Pizza',
      'A delicious pepperoni pizza, from scratch!',
      'https://cdn.pixabay.com/photo/2016/03/05/19/24/cheese-1238395_960_720.jpg',
      [
        new Ingredient('Cheese', 3),
        new Ingredient('Tomato sauce', 1),
        new Ingredient('Pepperoni', 5),
        new Ingredient('Flour', 2),
        new Ingredient('Eggs', 2),
      ],
    ),
    new Recipe(
      'Chocolate Cake',
      'Amazing chocolate cake.',
      'https://cdn.pixabay.com/photo/2016/03/05/19/24/cheese-1238395_960_720.jpg',
      [
        new Ingredient('Flour', 4),
        new Ingredient('Eggs', 3),
        new Ingredient('Sugar', 5),
        new Ingredient('Unsweetened Chocolate', 2),
      ],
    ),
  ];
  recipeSelected = new EventEmitter<Recipe>();
  listChanged = new EventEmitter<Recipe[]>();

  addRecipe(recipe: Recipe) {
    this.list.push(recipe);
    this.sortRecipes();
    this.listChanged.emit(this.getRecipes());
  }

  private sortRecipes() {
    this.list.sort(
      (a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1),
    );
  }

  getRecipes(): Recipe[] {
    return [...this.list];
  }
}
