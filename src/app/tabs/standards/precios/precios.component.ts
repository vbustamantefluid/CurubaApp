import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Types } from 'src/app/classes/types';
import { Prices, TypesJuCli } from 'src/app/models/prices';
import { PricingService } from 'src/app/services/pricing.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss'],
})
export class PreciosComponent {

  types = new Types;
  selectedCaliber = this.types.calibers[0];
  showArchives =  false;

  constructor(
    public alertController: AlertController,
    public pricingService: PricingService
  ){}

  changeCaliber(form: NgForm){
    let TYPES = Object.keys(form.value)
      .map((key) => [String(key).split(','), form.value[key]]);

    let newTypes = [] as TypesJuCli[];
    TYPES.forEach(TYP => {
      newTypes.push({
                      typeJuice: TYP[0][0],
                      typeClient: TYP[0][1],
                      price: TYP[1]
                    })
    });
    
    let selCal = this.pricingService.selectedPrice.calibers;
    if(selCal) selCal.find(cal => cal.caliber === this.selectedCaliber).types = newTypes;
 }

  getName(juice: string, client: string, caliber: string){
    return juice + ',' + client + ',' + caliber; 
  }

  getPrice = (caliber: number, juice: string, client: string) => {
    return this.pricingService.selectedPrice.calibers
      ?.find(cal => cal.caliber === caliber)?.types
      .find(typ => typ.typeClient === client && typ.typeJuice === juice)?.price;
  }

  savePrices(){
    this.pricingService.selectedPrice.id = '';
    this.pricingService.addPrice(this.pricingService.selectedPrice);
  }

  async deletePrice(id: string){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cuidado!',
      subHeader: 'Borrar archivo de precios?',
      message: 'No podrá recuperarse',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Borrar',
          handler: () => {
            this.pricingService.deletePrice(id);
          }
        }
      ]    
    });

    await alert.present();
  }


}
