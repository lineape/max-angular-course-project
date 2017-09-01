export class Ingredient {
  constructor(public name: string, public amount: number) {
    this.name = name.trim();
    this.amount = Math.floor(amount);
  }

  static sortNameAsc(o1: Ingredient, o2: Ingredient) {
    return o1.name.toLowerCase() > o2.name.toLowerCase() ? 1 : -1;
  }

  combineAmountsWith(ingredient: Ingredient) {
    this.amount += ingredient.amount;
  }
}
