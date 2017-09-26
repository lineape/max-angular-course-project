import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  styleUrls: ['./shopping-edit.component.css'],
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  selectedSubscription: Subscription;
  selected: Ingredient = null;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.form = Ingredient.getForm();
    this.selectedSubscription = this.shoppingListService.selectedChanged.subscribe(
      this.onSelectedChanged,
    );
  }

  ngOnDestroy() {
    this.selectedSubscription.unsubscribe();
  }

  onSelectedChanged = (ingredient: Ingredient) => {
    this.selected = ingredient;
    if (this.selected) {
      this.form.reset({ name: ingredient.name, amount: ingredient.amount });
    } else {
      this._resetForm();
    }
  };

  onSubmit() {
    const { name, amount } = this.form.value;
    const newIngredient = new Ingredient(name, amount);
    this.shoppingListService.addOrEditIngredient(this.selected, newIngredient);
    this._resetForm();
  }

  onDelete = () =>
    this.shoppingListService.deleteIngredient(this.selected) &&
    this._resetForm();

  private _resetForm = () => this.form.reset({ amount: 1 });
}
