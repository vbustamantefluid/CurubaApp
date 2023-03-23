import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Types } from 'src/app/classes/types';
import { ClientService } from 'src/app/services/client.service';
import { ProdDayService } from 'src/app/services/prod-day.service';
import { ProduccionCode } from '../produccion-code';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.scss'],
})
export class ComandaComponent {

  types = new Types;

  constructor(
    public clientService: ClientService,
    public alertController: AlertController,
    private router: Router,
    public produccionCode: ProduccionCode,
    public prodDayService: ProdDayService
  ){}

  gotoRemito(client: string){
    this.clientService.selectedClient = this.clientService.clients.find(cl => cl.name === client);
    this.router.navigate(['tabs/produccion/remito']);
  }

  getDateDeliverys(){
    let dates =  this.prodDayService.selectedProdDay.clientOrders.map(clO => clO.dateDelivery);
    return [...new Set(dates)];
  }

  async deliveryFinished(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atención',
      subHeader: 'La entrega fue realizada completamente?',
      message: 'El día de producción será archivado',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Continuar',
          handler: () => {
            this.prodDayService.selectedProdDay.status = 'entregado';
            this.prodDayService.updateProdDay(this.prodDayService.selectedProdDay);
            this.router.navigate(['tabs/produccion']);
          }
        }
      ]    
    });

    await alert.present();
  }

}
