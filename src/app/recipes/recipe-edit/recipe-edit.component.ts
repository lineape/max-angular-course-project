import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  styleUrls: ['./recipe-edit.component.css'],
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  form: FormGroup;
  ingredients: FormArray;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
  ) {}

  ngOnInit() {
    this.form = Recipe.getForm();
    this.ingredients = this.form.get('ingredients') as FormArray;
    this.route.params.subscribe(this.onParams);
  }

  addRecipeToForm() {
    const { name, description, imagePath, ingredients } = this.recipe;
    this.form.reset({ name, description, imagePath });
    ingredients.forEach(x => this.ingredients.push(Ingredient.getForm(x)));
  }

  onAddIngredient = () => this.ingredients.push(Ingredient.getForm());

  onDeleteIngredient(i: number) {
    const name = this.ingredients.at(i).value;
    const nameIsEmpty = (name || '').trim() === '';
    if (nameIsEmpty || confirm(`Delete ingredient ${name}?`)) {
      this.ingredients.removeAt(i);
    }
  }

  onSubmit() {
    const { name, description, imagePath, ingredients: ing } = this.form.value;
    const rIngredients = ing.map(x => new Ingredient(x.name, x.amount));
    const newRecipe = new Recipe(name, description, imagePath, rIngredients);
    const id = this.recipeService.addOrEditRecipe(this.recipe, newRecipe);
    this.router.navigate(['/recipes', id]);
  }

  onDeleteRecipe() {
    const recipeWasDeleted = this.recipeService.deleteRecipe(this.recipe);
    if (recipeWasDeleted) {
      this.router.navigate(['/recipes']);
    }
  }

  private onParams = (params: Params) => {
    if (params['id'] === undefined) {
      return;
    }
    this.recipe = this.recipeService.getRecipe(+params['id']);
    if (this.recipe instanceof Recipe) {
      this.addRecipeToForm();
    } else {
      this.router.navigate(['/recipes', 'new']);
    }
  };
}
