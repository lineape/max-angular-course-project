import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Ingredient {
  constructor(public name: string, public amount: number) {
    this.name = name.trim();
    this.amount = Math.floor(amount);
  }

  static sortNameAsc(o1: Ingredient, o2: Ingredient) {
    return o1.name.toLowerCase() > o2.name.toLowerCase() ? 1 : -1;
  }

  static getForm(
    ingredient: { name: string; amount: number } = { name: null, amount: 1 },
  ) {
    const { required, min, minLength } = Validators;
    return new FormGroup({
      name: new FormControl(ingredient.name, [required, minLength(2)]),
      amount: new FormControl(ingredient.amount, [required, min(1)]),
    });
  }

  combineAmountsWith(ingredient: Ingredient) {
    this.amount += ingredient.amount;
  }
}
