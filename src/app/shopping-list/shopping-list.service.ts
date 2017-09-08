import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
  private list: Ingredient[] = [];
  selectedChanged = new Subject<Ingredient>();
  listChanged = new Subject<Ingredient[]>();

  setList(list: Ingredient[]) {
    this.list = list;
    this.listChanged.next(this.getList());
  }

  addIngredient(ingredient: Ingredient | Ingredient[]) {
    const ingredients = Array.isArray(ingredient) ? ingredient : [ingredient];
    ingredients.forEach(x => this.addIngredientToList(x));
    this.list = this.list.filter(x => x.amount > 0);
    this.listChanged.next(this.getList());
  }

  editIngredient(oldIngredient: Ingredient, newIngredient: Ingredient) {
    this.list = this.list.filter(x => x.name !== oldIngredient.name);
    this.addIngredient(newIngredient);
  }

  addOrEditIngredient(oldIngredient: Ingredient, newIngredient: Ingredient) {
    if (oldIngredient instanceof Ingredient) {
      this.editIngredient(oldIngredient, newIngredient);
    } else {
      this.addIngredient(newIngredient);
    }
  }

  private addIngredientToList(ingredient: Ingredient) {
    const ingredientInList = this.list.find(x => x.name === ingredient.name);
    if (ingredientInList) {
      ingredientInList.combineAmountsWith(ingredient);
    } else {
      this.list.push(ingredient);
      this.list.sort(Ingredient.sortNameAsc);
    }
  }

  getList(): Ingredient[] {
    return [...this.list];
  }

  deleteList(): boolean {
    if (confirm('Sure you want to clear the list? This cannot be undone')) {
      this.selectedChanged.next(null);
      this.list = [];
      this.listChanged.next(this.getList());
      return true;
    }
    return false;
  }

  deleteIngredient(ingredient: Ingredient): boolean {
    if (confirm(`Sure you want to delete ${ingredient.name}?`)) {
      this.selectedChanged.next(null);
      this.list = this.list.filter(x => x.name !== ingredient.name);
      this.listChanged.next(this.getList());
      return true;
    }
    return false;
  }
}
