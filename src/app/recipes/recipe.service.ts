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
  listChanged = new EventEmitter<Recipe[]>();

  /**
   * Add a recipe to the list
   * @param {Recipe} recipe
   * @returns {number} id - the new id
   */
  addRecipe(recipe: Recipe): number {
    this.list.push(recipe);
    this.listChanged.emit(this.getRecipes());
    return this.list.length - 1;
  }

  /**
   * Edit a recipe in the list
   * @param {number} id
   * @param {Recipe} recipe
   * @returns {boolean} wasEdited
   */
  editRecipe(id: number, recipe: Recipe): boolean {
    if (!this.recipeIdExists(id)) {
      return false;
    }
    this.list[id] = recipe;
    this.listChanged.emit(this.getRecipes());
    return true;
  }

  /**
   * Delete a recipe from the list, confirming the delete first
   * @param {number} id
   * @returns {boolean} wasDeleted
   */
  deleteRecipe(id: number): boolean {
    if (
      !this.recipeIdExists(id) ||
      !confirm('You sure you want to delete it?')
    ) {
      return false;
    }
    this.list.splice(id, 1);
    this.listChanged.emit(this.getRecipes());
    return true;
  }

  /**
   * Get a copy of all recipes from the list
   * @returns {Recipe[]}
   */
  getRecipes(): Recipe[] {
    return [...this.list];
  }

  /**
   * Get a recipe from the list by id
   * @param {number} id
   * @returns {Recipe}
   */
  getRecipe(id: number): Recipe {
    if (!this.recipeIdExists(id)) {
      return null;
    }
    return this.list[id];
  }

  private recipeIdExists(id: number) {
    return Number.isInteger(id) && this.list.length > id && id >= 0;
  }
}
