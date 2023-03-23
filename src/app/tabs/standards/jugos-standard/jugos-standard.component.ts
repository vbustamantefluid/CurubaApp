import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Types } from 'src/app/classes/types';
import { Ingred, Standard } from 'src/app/models/standard';
import { IngredientService } from 'src/app/services/ingredient.service';
import { StandardService } from 'src/app/services/standard.service';

@Component({
  selector: 'app-jugos-standard',
  templateUrl: './jugos-standard.component.html',
  styleUrls: ['./jugos-standard.component.scss'],
})
export class JugosStandardComponent {

  types = new Types;
  selectedTypeJuice = this.types.typeJuice[0];

  constructor(
    public alertController: AlertController,
    public ingredientService: IngredientService,
    private router: Router,
    public standardService: StandardService
  ){}

  getTypeJuices(){
    return this.standardService.standards.filter(st => st.type === this.selectedTypeJuice);
  }

  new(){
    this.standardService.selectedStandard = { ingredients: [] as Ingred[] } as Standard;
    this.router.navigate(['tabs/standards/jugos-standard/jugo-standard'])
  }

  getWholeCost(standard: Standard){
    let wholeCost = 0;
    standard.ingredients
      .forEach((ing: any) =>  wholeCost += this.getCost(ing));
    return Math.round(wholeCost  * 10) / 10;
  }

  getCost(ingredient: { grsL: any; name: string; kgs: number; }){
    let ingred = this.ingredientService.ingredients
      .find(ing => ing.name === ingredient.name)
    let cost = (ingred?.cost / ingred?.kgs) * (ingredient.grsL / 1000);
    return Math.round(cost  * 10) / 10 || 0;
  }

  showIngredients(standard: Standard){
    this.standardService.selectedStandard === standard ?
    this.standardService.selectedStandard = {} as Standard :
    this.standardService.selectedStandard = standard;
  }

  editStandard(){
    this.standardService.selectedIngred = {} as Ingred;
    this.router.navigate(['tabs/standards/jugos-standard/jugo-standard']);
  }

  getTypeStandards(typeJuice: string){
    return this.standardService.standards.filter(st => st.type === typeJuice)
  }

  getYield(ingredient: { name: string; grsL: number; }){
    return this.ingredientService.ingredients
      .find(ing => ing.name === ingredient.name).yield * ingredient.grsL;
  }

  getWholeYield(standard: Standard){
    let sum = 0;
    standard.ingredients.forEach(ing => sum += this.getYield(ing));
    return sum / 1000;
  }

  async deleteStandard(standardId: string){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cuidado!',
      message: 'Borrar standard?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Borrar',
          handler: () => {
            this.standardService.selectedStandard = { ingredients: {} } as Standard;
            this.standardService.deleteStandard(standardId);
            this.router.navigate(['tabs/standards/jugos-standard'])          }
        }
      ]
    });

    await alert.present();
  }

}
