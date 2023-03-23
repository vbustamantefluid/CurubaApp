import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Types } from 'src/app/classes/types';
import { Caliber, TypeJuices } from 'src/app/models/manpower';
import { Standard } from 'src/app/models/standard';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ManpowerService } from 'src/app/services/manpower.service';
import { PricingService } from 'src/app/services/pricing.service';
import { StandardService } from 'src/app/services/standard.service';

@Component({
  selector: 'app-costing',
  templateUrl: './costing.component.html',
  styleUrls: ['./costing.component.scss'],
})
export class CostingComponent implements OnInit {

  types = new Types;
  selectedCaliber = this.types.calibers[0];
  selectedTypeJuice = this.types.typeJuice[0];
  selectedTypeClient = this.types.typeClient[0];
  iva = false;
  newPrice = false;
  material = false;
  newManpower = false;

  constructor(
    public manpowerService: ManpowerService,
    public standardService: StandardService,
    public ingredientService: IngredientService,
    public pricingService: PricingService
  ){}

  ngOnInit(){
/*    console.log('entra')
    this.manpowerService.selectedManpower.calibers = [] as Caliber[];
    this.types.calibers.forEach(cal => {
      let typeJuices = [] as TypeJuices[];
      this.types.typeJuice.forEach(typ => typeJuices.push({ typeJuice: typ, cost: 0 }));
      this.manpowerService.selectedManpower.calibers.push({ caliber: cal, typeJuice: typeJuices });
    });
    this.manpowerService.setManpower(this.manpowerService.selectedManpower);*/
  }

  getPrice(withIva?: string){
    let par = this.iva && withIva ? 1.21 : 1;
    let price =  this.pricingService.selectedPrice.calibers
    ?.find(cal => cal.caliber === this.selectedCaliber).types
    .find(typ => typ.typeClient === this.selectedTypeClient
      && typ.typeJuice === this.selectedTypeJuice).price
    return price * par;
  }

  changePrice(f: NgForm){
    if(f.value?.price){
      this.pricingService.selectedPrice.calibers
      .find(cal => cal.caliber === this.selectedCaliber).types
      .find(typ => typ.typeClient === this.selectedTypeClient
        && typ.typeJuice === this.selectedTypeJuice).price = f.value.price;
  
      this.pricingService.selectedPrice.id = '';
      this.pricingService.addPrice(this.pricingService.selectedPrice);  
    }
    this.newPrice = false;
  }

  getMaterial(){
    let sum = 0;
    let filterStandards = this.standardService.standards
    .filter(st => st.active && st.type === this.selectedTypeJuice);
    filterStandards.forEach(st2 => sum += this.getWholeCost(st2));
    let average = sum / filterStandards.length;
    let materialCost = average * this.selectedCaliber / 1000;
    return Math.round(materialCost * 10) / 10 ;   
  }

  getWholeCost(standard: Standard){
    let wholeCost = 0;
    standard.ingredients
      .forEach((ing: any) =>  wholeCost += this.getCost(ing));
    return wholeCost;
  }

  getCost(ingredient: { grsL: any; name: string; kgs: number; }){
    let ingred = this.ingredientService.ingredients
      .find(ing => ing.name === ingredient.name)
    let cost = (ingred?.cost / ingred?.kgs) * (ingredient.grsL / 1000);
    return cost;
  }

  materialPercent(){
    let result = this.getMaterial() / this.getPrice('withIva') * 100;
    return Math.round(result * 10) / 10 ;   
  }

  getManpower(){
    let cost = this.manpowerService.selectedManpower.calibers
    ?.find(cal => this.selectedCaliber === cal.caliber).typeJuice
    .find(typ => this.selectedTypeJuice === typ.typeJuice).cost;
    return Math.round(cost * 10) / 10 ;   
  }

  manpowerPercent(){
    let result = this.getManpower() / this.getPrice('withIva') * 100;
    return Math.round(result * 10) / 10 ;   
  }

  changeManpower(f: NgForm){
    if(f.value?.cost){
      this.manpowerService.selectedManpower.calibers
      .find(cal => cal.caliber === this.selectedCaliber).typeJuice
      .find(typ => typ.typeJuice === this.selectedTypeJuice).cost = f.value.cost;
  
      this.manpowerService.setManpower(this.manpowerService.selectedManpower);  
    }
    this.newManpower = false;
  }

  getLogistic(){
    return this.getPrice() * 0.1
  }

  logisticPercent(){
    let result = this.getLogistic() / this.getPrice('withIva') * 100;
    return Math.round(result * 10) / 10 ;  
  }

  getManagement(){
    return this.getPrice() * 0.03
  }

  managementPercent(){
    let result = this.getManagement() / this.getPrice('withIva') * 100;
    return Math.round(result * 10) / 10 ;  
  }

  getMarketing(){
    return this.getPrice() * 0.05
  }

  marketingPercent(){
    let result = this.getMarketing() / this.getPrice('withIva') * 100;
    return Math.round(result * 10) / 10;
  }

  getFranchise(){
    return this.getPrice() * 0
  }

  franchisePercent(){
    let result = this.getFranchise() / this.getPrice('withIva') * 100;
    return Math.round(result * 10) / 10;
  }

  getPackaging(){
    return 50;
  }

  packagingPercent(){
    let result = this.getPackaging() / this.getPrice('withIva') * 100;
    return Math.round(result * 10) / 10;
  }

  getRentability(){
    let price = this.getPrice('withIva');
    let material = this.getMaterial() || 0;
    let manpower = this.getManpower() || 0;
    let logistic = this.getLogistic() || 0;
    let management = this.getManagement() || 0;
    let marketing = this.getMarketing() || 0;
    let franchise = this.getFranchise() || 0;
    let packaging = this.getPackaging() || 0;

    let rentability = price - (material + manpower + logistic
              + management + marketing + franchise + packaging);

    return Math.round(rentability * 10) / 10 ;  
  }

  rentabilityPercent(){
    let result = this.getRentability() / this.getPrice('withIva') * 100;
    return Math.round(result * 10) / 10;
  }




}
