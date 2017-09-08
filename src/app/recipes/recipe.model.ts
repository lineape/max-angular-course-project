import { Ingredient } from '../shared/ingredient.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export class Recipe {
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[],
  ) {
    this.name = name.trim();
    this.description = description.trim();
    this.imagePath = imagePath.trim();
    this.ingredients.sort(Ingredient.sortNameAsc);
  }

  static getForm() {
    const { required, minLength } = Validators;
    return new FormGroup({
      name: new FormControl(null, [required, minLength(2)]),
      description: new FormControl(null, [required, minLength(5)]),
      imagePath: new FormControl(null, [required, minLength(5)]),
      ingredients: new FormArray([]),
    });
  }

  static fromJson(recipe): Recipe {
    return new Recipe(
      recipe.name,
      recipe.description,
      recipe.imagePath,
      (recipe.ingredients || []).map(Ingredient.fromJson),
    );
  }
}
