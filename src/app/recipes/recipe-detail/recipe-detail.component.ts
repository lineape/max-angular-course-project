import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router,
  ) {}

  ngOnInit() {}

  onAddToList() {
    this.shoppingListService.addToList(this.recipe.ingredients);
    this.router.navigate(['shopping-list']);
  }
}
