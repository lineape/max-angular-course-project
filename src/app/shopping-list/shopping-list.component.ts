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
  list: Ingredient[] = [];
  selected: Ingredient = null;
  private listSubscription: Subscription;
  private selectedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.list = this.shoppingListService.getList();
    this.listSubscription = this.shoppingListService.listChanged.subscribe(
      (newList: Ingredient[]) => {
        this.list = newList;
      },
    );
    this.selectedSubscription = this.shoppingListService.selectedChanged.subscribe(
      (ingredient: Ingredient) => {
        this.selected = ingredient;
      },
    );
  }

  onIngredientClick(ingredient: Ingredient) {
    if (this.selected === ingredient) {
      this.shoppingListService.selectedChanged.next(null);
    } else {
      this.shoppingListService.selectedChanged.next(ingredient);
    }
  }

  onDeleteList() {
    this.shoppingListService.deleteList();
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
    this.selectedSubscription.unsubscribe();
    this.shoppingListService.selectedChanged.next(null);
  }
}
