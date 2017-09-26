import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';

export class RecipeService {
  listChanged = new Subject<Recipe[]>();
  private list: Recipe[] = [];

  getRecipes = (): Recipe[] => [...this.list];

  getRecipe = (id: number): Recipe => (this.list[id] ? this.list[id] : null);

  setList = (recipes: Recipe[]) => {
    this.list = recipes;
    this.listChanged.next(this.getRecipes());
    return true;
  };

  addOrEditRecipe = (oldRecipe: Recipe, newRecipe: Recipe): number =>
    oldRecipe instanceof Recipe
      ? this.editRecipe(oldRecipe, newRecipe)
      : this.addRecipe(newRecipe);

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe): number {
    const recipeIndex = this.list.findIndex(x => x.name === oldRecipe.name);
    this.setList([
      ...this.list.slice(0, recipeIndex),
      newRecipe,
      ...this.list.slice(recipeIndex + 1),
    ]);
    return recipeIndex;
  }

  addRecipe = (recipe: Recipe): number =>
    this.setList(this.list.concat(recipe)) && this.list.length - 1;

  deleteRecipe = (recipe: Recipe): boolean =>
    confirm(`You sure you want to delete ${recipe.name}?`) &&
    this.setList(this.list.filter(x => x.name !== recipe.name));
}
