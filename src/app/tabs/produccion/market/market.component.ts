import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Ingredient } from 'src/app/models/ingrediente';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ProduccionCode } from '../produccion-code';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {

  ingredientsAmount = []

  constructor(
    public produccionCode: ProduccionCode,
    public ingredientService: IngredientService
  ){}

  ngOnInit(){
    this.getKgJugo();
    this.setInactive()
  }

  setInactive(){
    this.ingredientService.ingredients.forEach(ing => ing.inactive = false);
  }

  getIngredients(){
    return this.ingredientService.ingredients
      .filter(ing => this.ingredientsAmount
      .find(ia => ia.name === ing.name)?.amount > 0)
      .sort((a,b) => Number(a.inactive) - Number(b.inactive));
  }

  getKgJugo(){
    this.produccionCode.juicesPerTypeActive().forEach(juice => {
      let volume = this.produccionCode.volumePerJuice(juice.name);
      
      juice.ingredients.forEach(ing => {
        let ingred = this.ingredientsAmount
          .find(ia => ia.name === ing.name);
        let amount = ing.grsL * volume / 1000
        ingred ? ingred.amount += amount :
        this.ingredientsAmount
          .push({ name: ing.name, amount: amount })
      });
    });
  }

  getKgs(ingredient: Ingredient){
    let ingAmount = this.ingredientsAmount
      .find(ia => ia.name === ingredient.name);
    return ingAmount ? ingAmount.amount : 0;
  }

  getResult(ingredient: Ingredient){
    return this.getKgs(ingredient) - (ingredient.hay || 0);
  }

}
