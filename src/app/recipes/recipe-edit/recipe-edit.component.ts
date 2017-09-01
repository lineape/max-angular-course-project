import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      imagePath: new FormControl(null, [Validators.required]),
    });
    this.route.params.subscribe(this.onParams.bind(this));
  }

  onParams(params: Params) {
    if (params['id'] === undefined) {
      this.recipe = null;
      return;
    }
    this.recipe = this.recipeService.getRecipe(+params['id']);
    if (this.recipe === null) {
      this.router.navigate(['/recipes', 'new']);
      return;
    }
    this.form.reset({
      name: this.recipe.name,
      description: this.recipe.description,
      imagePath: this.recipe.imagePath,
    });
  }

  onSubmit() {
    const { name, description, imagePath } = this.form.value;
    const ingredients = this.recipe ? this.recipe.ingredients : [];
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
