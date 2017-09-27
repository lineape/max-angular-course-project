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
  selected: Ingredient = null;
  private selectedSub: Subscription;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.form = Ingredient.getForm();
    this.selectedSub = this.slService.selectedChanged.subscribe(
      this.onSelectedChanged,
    );
  }

  ngOnDestroy() {
    this.selectedSub.unsubscribe();
  }

  onSubmit() {
    const ingredient = new Ingredient(
      this.form.value.name,
      this.form.value.amount,
    );
    this.slService.addOrEditIngredient(this.selected, ingredient);
    this.resetForm();
  }

  onDelete = () =>
    this.slService.deleteIngredient(this.selected) && this.resetForm();

  private onSelectedChanged = (ingredient: Ingredient) => {
    this.selected = ingredient;
    if (this.selected) {
      this.form.reset({ name: ingredient.name, amount: ingredient.amount });
    } else {
      this.resetForm();
    }
  };

  private resetForm = () => this.form.reset({ amount: 1 });
}
