import { Component} from '@angular/core';
import { Ingred } from 'src/app/models/standard';
import { IngredientService } from 'src/app/services/ingredient.service';
import { StandardService } from 'src/app/services/standard.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss'],
})
export class IngredientComponent {

  constructor(
    public ingredientService: IngredientService,
    public standardService: StandardService
  ){}

  addIngredient(){
    let index = this.standardService.selectedStandard.ingredients
    .findIndex(ing => ing.name === this.standardService.selectedIngred.name);
    if(index === -1)
      this.standardService.selectedStandard.ingredients
      .push(this.standardService.selectedIngred);    
    this.standardService.selectedIngred = {} as Ingred;
  }

  getIngredients(){
    return this.ingredientService.ingredients.map(ing => ing.name);
  }

}
