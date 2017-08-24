import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

const isSameIngredient = a => b => a.name === b.name;
export class ShoppingListService {
  private list: Ingredient[] = [new Ingredient('Cheese', 3)];

  listChanged = new EventEmitter<Ingredient[]>();

  addToList(ingredient: Ingredient) {
    if (!this.isValidIngredient(ingredient)) {
      return;
    }
    if (this.ingredientIsInList(ingredient)) {
      this.mergeIngredients(ingredient);
    } else {
      this.list.push(ingredient);
      this.sortIngredients();
    }
    this.listChanged.emit(this.getList());
  }

  private mergeIngredients(ingredient: Ingredient) {
    this.list.find(isSameIngredient(ingredient)).amount += ingredient.amount;
  }

  ingredientIsInList(ingredient: Ingredient) {
    return this.list.some(isSameIngredient(ingredient));
  }

  private sortIngredients() {
    this.list.sort(
      (a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1),
    );
  }

  getList(): Ingredient[] {
    return [...this.list];
  }

  private isValidIngredient(ingredient: Ingredient): boolean {
    return (
      ingredient.name.trim().length > 2 &&
      !isNaN(ingredient.amount) &&
      ingredient.amount > 0
    );
  }
}
