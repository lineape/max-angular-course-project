import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  form: FormGroup;
  ingredients: FormArray;
  ingredientControls: FormGroup[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
  ) {}

  ngOnInit() {
    this.form = Recipe.getForm();
    this.ingredients = <FormArray>this.form.get('ingredients');
    this.ingredientControls = <FormGroup[]>this.ingredients.controls;
    this.route.params.subscribe(this.onParams.bind(this));
  }

  onParams(params: Params) {
    if (params['id'] === undefined) {
      return;
    }
    this.recipe = this.recipeService.getRecipe(+params['id']);
    if (this.recipe instanceof Recipe) {
      this.addRecipeToForm();
    } else {
      this.router.navigate(['/recipes', 'new']);
    }
  }

  private addRecipeToForm() {
    const { name, description, imagePath } = this.recipe;
    this.form.reset({ name, description, imagePath });
    this.recipe.ingredients.forEach((x, i) => {
      this.ingredients.push(Ingredient.getForm());
      this.ingredients.at(i).setValue({ name: x.name, amount: x.amount });
    });
  }

  onAddIngredient() {
    this.ingredients.push(Ingredient.getForm());
  }

  onDeleteIngredient(i: number) {
    if (confirm('Delete ingredient?')) {
      this.ingredients.removeAt(i);
    }
  }

  onSubmit() {
    const { name, description, imagePath, ingredients: ing } = this.form.value;
    const ingredients = ing.map(x => new Ingredient(x.name, x.amount));
    const newRecipe = new Recipe(name, description, imagePath, ingredients);

    const id = this.recipeService.addOrEditRecipe(this.recipe, newRecipe);
    this.router.navigate(['/recipes', id]);
  }

  deleteRecipe() {
    const recipeWasDeleted = this.recipeService.deleteRecipe(this.recipe);
    if (recipeWasDeleted) {
      this.router.navigate(['/recipes']);
    }
  }
}
