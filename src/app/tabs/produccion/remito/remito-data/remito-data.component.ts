import { Component } from '@angular/core';
import { Caliber, Juice } from 'src/app/models/prodDay';
import { ClientService } from 'src/app/services/client.service';
import { PricingService } from 'src/app/services/pricing.service';
import { ProdDayService } from 'src/app/services/prod-day.service';
import { StandardService } from 'src/app/services/standard.service';
import { ProduccionCode } from '../../produccion-code';

@Component({
  selector: 'app-remito-data',
  templateUrl: './remito-data.component.html',
  styleUrls: ['./remito-data.component.scss'],
})
export class RemitoDataComponent {

  numeroRemito: string;

  constructor(
    public standardService: StandardService,
    public pricingSercivce: PricingService,
    public produccionCode: ProduccionCode,
    public prodDayService: ProdDayService,
    public clientService: ClientService
  ){}

  getCalibers(){
    return this.getClientOrder().calibers;
  }

  getClientOrder(){
    return this.prodDayService.selectedProdDay.clientOrders
    .find(clO => clO.client === this.clientService.selectedClient.name)
  }

  getOrders(caliber: Caliber){
    return caliber.ordered.filter(or => or.amount > 0);
  }

  getPrice(caliber: Caliber, ordered: Juice){
    return this.pricingSercivce.selectedPrice.calibers
    .find(cal => cal.caliber === caliber.caliber).types
    .find(typ => typ.typeClient === this.clientService.selectedClient.type
      && typ.typeJuice === ordered.typeJuice).price;
  }

  getSubt(caliber: Caliber, ordered: Juice){
    return this.getPrice(caliber, ordered) * ordered.amount;
  }

  getCode(juice: string){
    return this.standardService.standards.find(st => st.name === juice).code;
  }

  totalAmount(){
    let sum = 0;
    this.getCalibers().forEach(cal => cal.ordered
      .forEach(or => sum += or.amount))
    return sum;
  }

}
