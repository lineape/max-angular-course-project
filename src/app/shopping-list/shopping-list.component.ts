import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  styleUrls: ['./shopping-list.component.css'],
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  list: Ingredient[] = [];
  selected: Ingredient = null;
  private listSub: Subscription;
  private selectedSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.list = this.shoppingListService.getList();
    this.listSub = this.shoppingListService.listChanged.subscribe(
      this.onListChanged,
    );
    this.selectedSub = this.shoppingListService.selectedChanged.subscribe(
      this.onSelectedChanged,
    );
  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
    this.selectedSub.unsubscribe();
    this.shoppingListService.selectedChanged.next(null);
  }

  onListChanged = (newList: Ingredient[]) => (this.list = newList);

  onSelectedChanged = (ingredient: Ingredient) => (this.selected = ingredient);

  onIngredientClick = (ingredient: Ingredient) =>
    this.selected === ingredient
      ? this.shoppingListService.selectedChanged.next(null)
      : this.shoppingListService.selectedChanged.next(ingredient);

  onDeleteList = () => this.shoppingListService.deleteList();
}
