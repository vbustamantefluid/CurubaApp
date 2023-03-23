import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Types } from 'src/app/classes/types';
import { Ingredient } from 'src/app/models/ingrediente';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ProdDayService } from 'src/app/services/prod-day.service';

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.component.html',
  styleUrls: ['./mercado.component.scss'],
})
export class MercadoComponent {

  types = new Types;
  selectedTypeIngredient = this.types.typeIngredient[0];

  constructor(
    private router: Router,
    public prodDayService: ProdDayService,
    public ingredientService: IngredientService
    ){}

  new(){
    this.ingredientService.selectedIngredient = {} as Ingredient;
    this.ingredientService.newIngredient = true;
    this.router.navigate(['/tabs/standards/mercado/ingrediente'])
  }

  getCost(ingredient: { cost: number; kgs: number; }){
    return Math.round(ingredient.cost / ingredient.kgs  * 10) / 10;
  }

  getIngredients(type: string){
    return this.ingredientService.ingredients
      .filter(ing => ing.type === type) as Ingredient[];
  }

  setIngredient(ingredient: Ingredient){
    this.ingredientService.selectedIngredient = ingredient;
    this.router.navigate(['/tabs/standards/mercado/ingrediente'])
  }

}
