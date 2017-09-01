import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  selectedSubscription: Subscription;
  selected: Ingredient = null;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.form = Ingredient.getForm();
    this.selectedSubscription = this.shoppingListService.selectedChanged.subscribe(
      this.onSelectedChanged.bind(this),
    );
  }

  onSelectedChanged(ingredient: Ingredient) {
    if (ingredient) {
      this.selected = ingredient;
      this.form.reset({ name: ingredient.name, amount: ingredient.amount });
    } else {
      this.selected = null;
      this.form.reset({ amount: 1 });
    }
  }

  onSubmit() {
    const { name, amount } = this.form.value;
    const newIngredient = new Ingredient(name, amount);
    this.shoppingListService.addOrEditIngredient(this.selected, newIngredient);
    this.form.reset({ amount: 1 });
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.selected);
  }

  onClear() {
    this.shoppingListService.clearList();
  }

  ngOnDestroy() {
    this.selectedSubscription.unsubscribe();
  }
}
