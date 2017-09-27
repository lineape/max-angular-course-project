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

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.list = this.slService.getList();
    this.listSub = this.slService.listChanged.subscribe(this.onListChange);
    this.selectedSub = this.slService.selectedChanged.subscribe(
      this.onSelectedChange,
    );
  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
    this.selectedSub.unsubscribe();
    this.slService.selectedChanged.next(null);
  }

  onIngredientClick = (ingredient: Ingredient) =>
    this.selected === ingredient
      ? this.slService.selectedChanged.next(null)
      : this.slService.selectedChanged.next(ingredient);

  onDeleteList = () => this.slService.deleteList();

  private onListChange = (newList: Ingredient[]) => (this.list = newList);

  private onSelectedChange = (ingredient: Ingredient) =>
    (this.selected = ingredient);
}
