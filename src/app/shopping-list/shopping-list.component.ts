import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  selected: Ingredient = null;
  list: Ingredient[] = [];
  private listSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.list = this.shoppingListService.getList();
    this.listSubscription = this.shoppingListService.listChanged.subscribe(
      (newList: Ingredient[]) => {
        this.list = newList;
      },
    );
  }

  onIngredientClick(ingredient: Ingredient) {
    if (this.selected === ingredient) {
      this.selected = null;
    } else {
      this.selected = ingredient;
    }
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
  }
}
