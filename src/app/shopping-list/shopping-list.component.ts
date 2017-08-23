import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

const isSameIngredient = a => b => a.name === b.name;
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [new Ingredient('Cheese', 3)];

  constructor() {}

  ngOnInit() {}

  onAddToShoppingList(ingredient: Ingredient) {
    if (this.ingredientIsInList(ingredient)) {
      return this.mergeIngredients(ingredient);
    }
    this.ingredients.push(ingredient);
    this.sortIngredients();
  }

  mergeIngredients(ingredient: Ingredient) {
    this.ingredients.find(isSameIngredient(ingredient)).amount +=
      ingredient.amount;
  }

  ingredientIsInList(ingredient: Ingredient) {
    return this.ingredients.some(isSameIngredient(ingredient));
  }
  sortIngredients() {
    this.ingredients.sort(
      (a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1),
    );
  }
}
