import { Component, OnDestroy, OnInit } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  listSize = 0;
  listSubscription: Subscription;
  constructor(
    private dataService: DataStorageService,
    private shoppingListService: ShoppingListService,
  ) {}

  ngOnInit() {
    this.listSize = this.shoppingListService.getList().length;
    this.listSubscription = this.shoppingListService.listChanged.subscribe(
      (list: Ingredient[]) => {
        this.listSize = list.length;
      },
    );
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataService.saveAll().subscribe();
  }

  onFetchData() {
    this.dataService.fetchAll().subscribe();
  }
}
