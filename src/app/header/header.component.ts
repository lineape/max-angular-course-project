import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DataStorageService } from '../shared/data-storage.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html',
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
