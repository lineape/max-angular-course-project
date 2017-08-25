import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  private list: Ingredient[] = [];

  listChanged = new EventEmitter<Ingredient[]>();

  addToList(ingredient: Ingredient | Ingredient[]) {
    const ingredients = Array.isArray(ingredient) ? ingredient : [ingredient];
    ingredients.forEach(x => this.addIngredientToList(x));
    this.list = this.list.filter(x => x.amount > 0);
    this.listChanged.emit(this.getList());
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
}
