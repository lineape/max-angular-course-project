import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

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
  listChanged = new Subject<Recipe[]>();

  /**
   * Add a recipe to the list
   * @param {Recipe} recipe
   * @returns {number} id
   */
  addRecipe(recipe: Recipe): number {
    this.list.push(recipe);
    this.listChanged.next(this.getRecipes());
    return this.list.length - 1;
  }

  /**
   * Edit a recipe in the list
   * @param {Recipe} oldRecipe
   * @param {Recipe} newRecipe
   * @returns {number} id
   */
  editRecipe(oldRecipe: Recipe, newRecipe: Recipe): number {
    const index = this.list.findIndex(x => x.name === oldRecipe.name);
    this.list[index] = newRecipe;
    this.listChanged.next(this.getRecipes());
    return index;
  }

  /**
   * Add or update a recipe, depending on if the first argument is null
   * @param {Recipe} oldRecipe
   * @param {Recipe} newRecipe
   * @returns {number} id
   */
  addOrEditRecipe(oldRecipe: Recipe, newRecipe: Recipe): number {
    if (oldRecipe instanceof Recipe) {
      return this.editRecipe(oldRecipe, newRecipe);
    } else {
      return this.addRecipe(newRecipe);
    }
  }

  /**
   * Delete a recipe from the list, confirming the delete first
   * @param {Recipe} recipe
   * @returns {boolean} wasDeleted
   */
  deleteRecipe(recipe: Recipe): boolean {
    if (confirm('You sure you want to delete it?')) {
      this.list = this.list.filter(x => x.name !== recipe.name);
      this.listChanged.next(this.getRecipes());
      return true;
    }
    return false;
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
    return this.list[id] ? this.list[id] : null;
  }
}
