import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
  private list: Ingredient[] = [];

  listChanged = new Subject<Ingredient[]>();

  addToList(ingredient: Ingredient | Ingredient[]) {
    const ingredients = Array.isArray(ingredient) ? ingredient : [ingredient];
    ingredients.forEach(x => this.addIngredientToList(x));
    this.list = this.list.filter(x => x.amount > 0);
    this.listChanged.next(this.getList());
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

  clearList() {
    if (confirm('Sure you want to clear the list? This cannot be undone')) {
      this.list = [];
      this.listChanged.next(this.getList());
    }
  }

  deleteIngredient(ingredient: Ingredient) {
    if (confirm(`Sure you want to delete ${ingredient.name}?`)) {
      this.list = this.list.filter(x => x.name === ingredient.name);
    }
  }
}
