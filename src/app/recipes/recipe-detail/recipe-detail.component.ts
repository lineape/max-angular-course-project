import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  styleUrls: ['./recipe-detail.component.css'],
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  id = -1;
  recipe: Recipe;
  private recipeSub: Subscription;

  constructor(
    private recipeService: RecipeService,
    private slService: ShoppingListService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(this.onParams);
    this.recipeSub = this.recipeService.listChanged.subscribe(
      this.onRecipesChanged,
    );
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }

  onAddToList() {
    this.slService.addIngredients(this.recipe.ingredients);
    this.router.navigate(['shopping-list']);
  }

  onDelete() {
    const recipeWasDeleted = this.recipeService.deleteRecipe(this.recipe);
    if (recipeWasDeleted) {
      this.router.navigate(['/recipes']);
    }
  }

  private onParams = (params: Params) => {
    this.id = +params['id'];
    this.recipe = this.recipeService.getRecipe(this.id);
  };

  private onRecipesChanged = () =>
    (this.recipe = this.recipeService.getRecipe(this.id));
}
