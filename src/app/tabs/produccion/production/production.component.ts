import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Types } from 'src/app/classes/types';
import { ProdDayService } from 'src/app/services/prod-day.service';
import { ProduccionCode } from '../produccion-code';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
})
export class ProductionComponent {

  types = new Types;

  constructor(
    public produccionCode: ProduccionCode,
    public alertController: AlertController,
    private router: Router,
    public prodDayService: ProdDayService,
  ){}


  getCapital(type: string){
    switch(type){
      case 'Jugo Natural': return 'JN';
      case 'Detox': return 'D';
      case 'Leche Vegetal': return 'LV';
      case 'Infusión': return 'I';
      case 'Probiótico': return 'P';
      case 'Naranja 100%': return 'N%';
      case 'Limón 100%': return 'L%';
    }
  }

  selectType(type: string){
    this.prodDayService.printJuiceType = type;
  }

  async done(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atención',
      subHeader: 'Los jugos fueron producidos y entregados?',
      message: 'Las cantidades no podrán modificarse',
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
