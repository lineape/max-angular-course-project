import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Ingredient {
  static sortNameComparator = (a: Ingredient, b: Ingredient) =>
    a.name.localeCompare(b.name, 'en-us');

  static fromJson = ({ name, amount }): Ingredient =>
    new Ingredient(name, amount);

  static getForm = (
    ingredient: {
      name?: string;
      amount: number;
    } = { name: null, amount: 1 },
  ) =>
    new FormGroup({
      amount: new FormControl(ingredient.amount, [
        Validators.required,
        Validators.min(1),
      ]),
      name: new FormControl(ingredient.name, [
        Validators.required,
        Validators.minLength(2),
      ]),
    });

  constructor(public name: string, public amount: number) {
    this.name = name.trim();
    this.amount = Math.floor(Number(amount));
  }

  addAmountFrom = (ing: Ingredient) => (this.amount += ing.amount);
}
