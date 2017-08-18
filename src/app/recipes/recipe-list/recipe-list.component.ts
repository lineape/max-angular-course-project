import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Cheese',
      'Delicious',
      'https://cdn.pixabay.com/photo/2016/03/05/19/24/cheese-1238395_960_720.jpg',
    ),
    new Recipe(
      'Cheese',
      'Delicious',
      'https://cdn.pixabay.com/photo/2016/03/05/19/24/cheese-1238395_960_720.jpg',
    ),
  ];
  constructor() {}

  ngOnInit() {}
}
