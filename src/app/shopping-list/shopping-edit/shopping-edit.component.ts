import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    const { required, minLength, min } = Validators;
    this.form = new FormGroup({
      name: new FormControl(null, [required, minLength(2)]),
      amount: new FormControl(1, [required, min(1)]),
    });
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
    const ingredient = new Ingredient(name, amount);
    if (this.selected) {
      this.shoppingListService.replaceIngredient(this.selected, ingredient);
    } else {
      this.shoppingListService.addToList(ingredient);
    }
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
