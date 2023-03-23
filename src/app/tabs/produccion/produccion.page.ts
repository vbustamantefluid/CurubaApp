import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProdDay } from 'src/app/models/prodDay';
import { ClientService } from 'src/app/services/client.service';
import { ProdDayService } from 'src/app/services/prod-day.service';
import { AlertController } from '@ionic/angular';
import { ProduccionCode } from './produccion-code';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-produccion',
  templateUrl: 'produccion.page.html',
  styleUrls: ['produccion.page.scss']
})
export class ProduccionPage {

  constructor(
    public ingredientService: IngredientService,
    public produccionCode: ProduccionCode,
    public alertController: AlertController,
    private router: Router,
    public clientService: ClientService,
    public prodDayService: ProdDayService
  ){}

  selectProdDay(prodDay: ProdDay){
    this.prodDayService.selectedProdDay = prodDay;
    this.clientService.selectedClient = {} as Client;

    if(prodDay.status === 'pendiente')
      this.router.navigate(['tabs/produccion/diaprod']);

    if(prodDay.status === 'producido')
      this.router.navigate(['tabs/produccion/comanda']);
  }

  newProdDay(){
    this.router.navigate(['tabs/produccion/nuevoDiaProd'])
  }

  async deleteProdDay(id: string){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cuidado!',
      subHeader: 'Borrar día de producción?',
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
            this.prodDayService.deleteProdDay(id);
            this.router.navigate(['tabs/produccion'])
          }
        }
      ]    
    });
    
    await alert.present();
  }

}
