import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  listSize = 0;
  isAuthenticated: boolean;
  private listSub: Subscription;
  private authSub: Subscription;

  constructor(
    private dataService: DataStorageService,
    private slService: ShoppingListService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.listSize = this.slService.getList().length;
    this.listSub = this.slService.listChanged.subscribe(this.onListChange);
    this.authSub = this.authService.authChanged.subscribe(this.onAuthChange);
  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
    this.authSub.unsubscribe();
  }

  onSaveData = async () =>
    this.dataService.saveRecipes(await this.authService.getToken()).subscribe();

  onFetchData = async () =>
    this.dataService
      .fetchRecipes(await this.authService.getToken())
      .subscribe();

  onSignout = () => this.authService.signOut();

  private onListChange = (list: Ingredient[]) => (this.listSize = list.length);

  private onAuthChange = (user: firebase.User) =>
    (this.isAuthenticated = !!user);
}
