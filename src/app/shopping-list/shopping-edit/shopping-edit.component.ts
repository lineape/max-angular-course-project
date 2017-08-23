import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() addToShoppingList = new EventEmitter<Ingredient>();
  constructor() {}

  ngOnInit() {}

  onAdd(e: Event) {
    e.preventDefault();
    const name = this.nameInput.nativeElement.value;
    const amount = parseInt(this.amountInput.nativeElement.value, 10);

    const nameIsLongEnough = name.trim().length > 2;
    const amountIsLargerThan0 = !isNaN(amount) && amount > 0;
    if (nameIsLongEnough && amountIsLargerThan0) {
      this.addToShoppingList.emit(new Ingredient(name, amount));
    }
  }
}
