import { Injectable } from '@angular/core';
import { Types } from 'src/app/classes/types';
import { ClientOrder, Juice, Caliber } from 'src/app/models/prodDay';
import { UserService } from 'src/app/services/auth/users.service';
import { ClientService } from 'src/app/services/client.service';
import { PricingService } from 'src/app/services/pricing.service';
import { ProdDayService } from 'src/app/services/prod-day.service';
import { StandardService } from 'src/app/services/standard.service';

@Injectable({ providedIn: 'root' }) export class ProduccionCode {

  types = new Types;

  constructor(
    private userService: UserService,
    private pricingService: PricingService,
    private clientService: ClientService,
    private standardService: StandardService,
    private prodDayService: ProdDayService
  ){}

  amountPerClientPerCaliberAndJuice(clientOrder: ClientOrder, caliber: number, juice: string){
    return clientOrder.calibers
      .find(cal => cal.caliber === caliber)?.ordered
      .find(or => or.juice === juice).amount;
  }

  amountPerCaliberAndJuice(caliber: number, juice: string){
    let sum = 0;
    this.prodDayService.selectedProdDay.clientOrders
    .forEach(clO => {
      let jui = clO.calibers
        .find(cal => cal.caliber.toString() === caliber.toString())?.ordered
        .find(ord => ord.juice === juice);
      if(jui) sum+= jui.amount;
    });
    return sum;
  }

  amountPerCaliber(caliber: number){
    let sum = 0;
    this.standardService.standards
      .forEach(st => sum += this.amountPerCaliberAndJuice(caliber, st.name));
    return sum;
  }

  amountPerJuice(jugo: string){
    let sum = 0;
    this.prodDayService.selectedProdDay?.clientOrders
      .forEach(clo => clo.calibers
      .forEach(cal => cal?.ordered
      .forEach(ord => ord.juice === jugo ? sum += ord.amount : '')));
    return sum;
  }

  sealsPerJuice(jugo: string){
    let sum = 0;
    this.prodDayService.selectedProdDay?.clientOrders
      .filter(clOrd => this.withSeals(clOrd.client))
      .forEach(clo => clo.calibers
      .forEach(cal => cal?.ordered
      .forEach(ord => ord.juice === jugo ? sum += ord.amount : '')));
    return sum;
  }

  withSeals(name: string){
    return this.clientService.clients.find(ccll => ccll.name === name).seals;
  }

  amountPerClientAndCaliber(clientOrder: ClientOrder, caliber: number){
    let sum = 0;
    clientOrder.calibers.find(cal => cal.caliber === caliber)?.ordered
    .forEach(or => sum += or.amount);
    return sum;
  }

  calibersActive(){
    return this.types.calibers.filter(cal => this.amountPerCaliber(cal) !== 0);
  }

  calibersByJuiceActive(jugo: string){
    return this.types.calibers
    .filter(cal => this.amountPerCaliberAndJuice(cal, jugo) !== 0)
  }

  calibersByClientActive(clientOrder: ClientOrder){
    return this.clientService.clients
      .find(cl => cl.name === clientOrder.client).caliber
      .filter(cal => this.amountPerClientAndCaliber(clientOrder, cal) !== 0);
  }

  clientOrderIfDateDelivery(dateDelivery: Date){
    return this.prodDayService.selectedProdDay.clientOrders
    .filter(clO => clO.dateDelivery === dateDelivery);
  }

  juicesPerTypeAndCaliberActive(type: string, caliber: number){
    return this.standardService.standards.filter(st => 
      st.type === type 
      && (st.active || this.amountPerCaliberAndJuice(caliber, st.name) !== 0));
  }

  juicesPerTypeActive(type?: string){
    return this.standardService.standards.filter(st => 
      this.amountPerJuice(st.name) !== 0 && (st.type === type || !type));
  }

  typeJuicesByClient(client: string){
    return this.clientService.clients.find(cl => cl.name === client).typeJuices;
  }

  typeJuicesPerProdDay(){
    return this.types.typeJuice.filter(tyJ => 
      this.prodDayService.selectedProdDay.clientOrders
      ?.find(clO => this.clientService.clients
      .find(cl => cl.name === clO.client).typeJuices
      .find(typ => typ === tyJ)));
  }

  chargePerClient(clientOrder: ClientOrder){
    let sum = 0;
    let client = this.clientService.clients
      .find(cli => cli.name === clientOrder.client);
    clientOrder.calibers.forEach(cal => {
      cal.ordered.forEach(ord => {
        let type = this.pricingService.selectedPrice.calibers
          .find(calib => calib.caliber.toString() === cal.caliber.toString())?.types
          .find(typ => typ.typeJuice === ord.typeJuice && typ.typeClient === client.type);
        if(type) sum += type.price * ord.amount;
      });
    });
    return client.iva ? sum * 1.21 : sum;
  }

  totalCharge(){
    let sum = 0;
    this.prodDayService.selectedProdDay.clientOrders
      ?.forEach(clO => sum += this.chargePerClient(clO));
    return sum;
  }

  volumePerJuice(jugo: string){
    let volume = 0;
    this.types.calibers.forEach(cal => {
      let amount = this.amountPerCaliberAndJuice(cal, jugo);
      volume += amount * cal / 1000;
    })
    return Math.round(volume * 10) / 10 ;   
  }

  fillClientOrder(value: string){
    let calibers = [] as Caliber[];
    let client = this.clientService.clients.find(cl => cl.name === value);
    if(client){
      client.caliber.forEach(cal => {
        let ordered = [] as Juice[];
        this.standardService.standards
          .forEach(stand =>  ordered.push({ juice: stand.name, typeJuice: stand.type, amount: 0 }));
        calibers.push({ caliber: cal, ordered: ordered, produced: [] } as Caliber);
      });
      this.prodDayService.selectedProdDay.clientOrders.push({ 
                                                        client: value, 
                                                        calibers: calibers, 
                                                        dateDelivery: this.prodDayService.selectedProdDay.date 
                                                      } as ClientOrder);
    } else {
      let userId = value.split(',')[1]
      let user = this.userService.users.find(us => us.id === userId);
      if(value.split(',')[0] === 'prod' && user)
        this.prodDayService.selectedProdDay.production.push(userId);
      if(value.split(',')[0] === 'rprt' && user)
        this.prodDayService.selectedProdDay.delivery.push(userId);
    }
  }


}