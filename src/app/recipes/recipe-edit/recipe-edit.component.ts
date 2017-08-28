import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  id: number;
  recipe: Recipe;
  recipeName = '';
  recipeDescription = '';
  recipeImagePath = '';
  recipeIngredients: Ingredient[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.getRecipe(+params['id']);
        if (this.recipe === null) {
          this.router.navigate(['/recipes', 'new']);
        }
      }
    });
  }

  private getRecipe(id: number) {
    this.id = id;
    this.recipe = this.recipeService.getRecipe(this.id);
    if (this.recipe) {
      this.recipeName = this.recipe.name;
      this.recipeDescription = this.recipe.description;
      this.recipeImagePath = this.recipe.imagePath;
      this.recipeIngredients = [...this.recipe.ingredients];
    }
  }

  onFormSubmit(e: Event) {
    e.preventDefault();
    const newRecipe = new Recipe(
      this.recipeName,
      this.recipeDescription,
      this.recipeImagePath,
      this.recipeIngredients,
    );
    if (this.editMode) {
      this.recipeService.editRecipe(this.id, newRecipe);
    } else {
      this.id = this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate(['/recipes', this.id]);
  }

  deleteRecipe(e: Event) {
    e.preventDefault();
    const recipeWasDeleted = this.recipeService.deleteRecipe(this.id);
    if (recipeWasDeleted) {
      this.router.navigate(['/recipes']);
    }
  }
}
