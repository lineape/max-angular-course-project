import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit {
  form: FormGroup;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    const { required, minLength, min } = Validators;
    this.form = new FormGroup({
      name: new FormControl(null, [required, minLength(2)]),
      amount: new FormControl(1, [required, min(1)]),
    });
  }

  onSubmit() {
    const { name, amount } = this.form.value;
    const ingredient = new Ingredient(name, Math.floor(amount));
    this.shoppingListService.addToList(ingredient);
    this.form.reset({ amount: 1 });
  }

  onClear() {
    this.shoppingListService.clearList();
  }
}
