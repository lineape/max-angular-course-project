import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {}

  onAdd(e: Event, nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    e.preventDefault();
    const name = nameInput.value;
    const amount = parseInt(amountInput.value, 10);
    this.shoppingListService.addToList(new Ingredient(name, amount));
  }
}
