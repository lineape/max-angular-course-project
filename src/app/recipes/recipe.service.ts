import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Recipe 1',
      'Delicious',
      'https://cdn.pixabay.com/photo/2016/03/05/19/24/cheese-1238395_960_720.jpg',
    ),
    new Recipe(
      'Cheese2',
      'Delicious',
      'https://cdn.pixabay.com/photo/2016/03/05/19/24/cheese-1238395_960_720.jpg',
    ),
  ];
  recipeSelected = new EventEmitter<Recipe>();

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }
}
