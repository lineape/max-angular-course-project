import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';

export class RecipeService {
  listChanged = new Subject<Recipe[]>();
  private list: Recipe[] = [];

  setList(recipes: Recipe[]) {
    this.list = recipes;
    this.listChanged.next(this.getRecipes());
  }

  addRecipe(recipe: Recipe): number {
    this.list.push(recipe);
    this.listChanged.next(this.getRecipes());
    return this.list.length - 1;
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe): number {
    const index = this.list.findIndex(x => x.name === oldRecipe.name);
    this.list[index] = newRecipe;
    this.listChanged.next(this.getRecipes());
    return index;
  }

  addOrEditRecipe(oldRecipe: Recipe, newRecipe: Recipe): number {
    if (oldRecipe instanceof Recipe) {
      return this.editRecipe(oldRecipe, newRecipe);
    } else {
      return this.addRecipe(newRecipe);
    }
  }

  deleteRecipe(recipe: Recipe): boolean {
    if (confirm('You sure you want to delete it?')) {
      this.list = this.list.filter(x => x.name !== recipe.name);
      this.listChanged.next(this.getRecipes());
      return true;
    }
    return false;
  }

  getRecipes(): Recipe[] {
    return [...this.list];
  }

  getRecipe(id: number): Recipe {
    return this.list[id] ? this.list[id] : null;
  }
}
