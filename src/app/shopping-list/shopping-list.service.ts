import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  private static _addIngredientsToList(
    list: Ingredient[],
    ingredientsToAdd: Ingredient[],
  ): Ingredient[] {
    ingredientsToAdd.forEach((ingredient: Ingredient) => {
      const listIndex = list.findIndex(x => x.name === ingredient.name);
      return listIndex > -1
        ? list[listIndex].addAmountFrom(ingredient)
        : list.push(ingredient);
    });
    return list.sort(Ingredient.sortNameComparator);
  }

  listChanged = new Subject<Ingredient[]>();
  selectedChanged = new Subject<Ingredient>();

  private list: Ingredient[] = [];

  getList = (): Ingredient[] => [...this.list];

  setList(newList: Ingredient[]): boolean {
    this.list = [...newList].filter(x => x.amount > 0);
    this.selectedChanged.next(null);
    this.listChanged.next(this.getList());

    return true;
  }

  addOrEditIngredient = (oldIng: Ingredient, newIng: Ingredient) =>
    oldIng instanceof Ingredient
      ? this.editIngredient(oldIng, newIng)
      : this.addIngredient(newIng);

  editIngredient = (oldIng: Ingredient, newIng: Ingredient): boolean =>
    this._deleteIngredient(oldIng) && this.addIngredient(newIng);

  addIngredient = (ingredient: Ingredient): boolean =>
    this.addIngredients([ingredient]);

  addIngredients = (ingredients: Ingredient[]): boolean =>
    this.setList(
      ShoppingListService._addIngredientsToList([...this.list], ingredients),
    );

  deleteList = (): boolean =>
    confirm('Sure you want to delete the list? This cannot be undone') &&
    this.setList([]);

  deleteIngredient = (ingredient: Ingredient): boolean =>
    confirm(`Sure you want to delete ${ingredient.name}?`) &&
    this._deleteIngredient(ingredient);

  private _deleteIngredient = (ingredient: Ingredient): boolean =>
    this.setList(this.list.filter(x => x !== ingredient));
}
