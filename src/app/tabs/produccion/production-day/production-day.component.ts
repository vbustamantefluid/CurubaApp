import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { Caliber, ClientOrder } from 'src/app/models/prodDay';
import { ClientService } from 'src/app/services/client.service';
import { ProdDayService } from 'src/app/services/prod-day.service';
import { StandardService } from 'src/app/services/standard.service';
import { UserService } from 'src/app/services/auth/users.service';
import { ProduccionCode } from '../produccion-code';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Types } from 'src/app/classes/types';
import { Standard } from 'src/app/models/standard';

@Component({
  selector: 'app-production-day',
  templateUrl: './production-day.component.html',
  styleUrls: ['./production-day.component.scss'],
})
export class ProductionDayComponent{

  openClients = false;
  openJuices = false;
  types = new Types;
  selectedTypeJuice = this.types.typeJuice[0];

  constructor(
    public alertController: AlertController,
    public produccionCode: ProduccionCode,
    public userService: UserService,
    private router: Router,
    public standardService: StandardService,
    public clientService: ClientService,
    public prodDayService: ProdDayService
  ){}

  getTypeJuices(){
    return this.standardService.standards.filter(st => st.type === this.selectedTypeJuice);
  }

  toggleActive(juice: Standard){
    juice.active = !juice.active;
    this.standardService.updateStandard(juice);
  }

  loadOrder(){
    this.prodDayService.updateProdDay(this.prodDayService.selectedProdDay)
    this.clientService.selectedClient = { contactInfo: {} } as Client;
  }

  selectClient(name: string){
    this.clientService.selectedClient.name === name ? 
    this.loadOrder() :
    this.clientService.selectedClient = this.clientService.clients
      .find(cl => cl.name === name);
  }

  gotoProduction(){
    this.router.navigate(['tabs/produccion/producir']);
  }

  getUserNames(){
    let userNames = [];
    this.prodDayService.selectedProdDay.production?.forEach(usId => {
      let userName = this.userService.users.find(us => us.id === usId).name;
      if(userName) userNames.push(userName);
    });
    return userNames;
  }

  getUserDelivery(){
    let userNames = [];
    this.prodDayService.selectedProdDay.delivery?.forEach(usId => {
      let userName = this.userService.users.find(us => us.id === usId).name;
      if(userName) userNames.push(userName);
    });
    return userNames;
  }

  getCode(name: string){
    return this.standardService.standards.find(st => st.name === name)?.code;
  }

  getOrdered(caliber: Caliber, type: string){
    return caliber.ordered?.filter(ord => 
      ord.typeJuice === type && (this.isActive(ord.juice) || ord.amount !== 0));
  }

  isActive(juice: string){
    return this.standardService.standards.find(st => st.name === juice)?.active;
  }

  gotoRemito(client: string){
    this.clientService.selectedClient = this.clientService.clients.find(cl => cl.name === client);
    this.router.navigate(['tabs/produccion/remito']);
  }

  async deleteClientOrder(client: string){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cuidado!',
      subHeader: 'Borrar Cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Borrar',
          handler: () => {
            let index = this.prodDayService.selectedProdDay.clientOrders.findIndex(clO => clO.client === client);
            this.prodDayService.selectedProdDay.clientOrders.splice(index,1);         
          }
        }
      ]    
    });
    
    await alert.present();
  }

  getClients(){
    return this.clientService.clients
      .filter(cl => !this.prodDayService.selectedProdDay.clientOrders
      .map(clO => clO.client).find(client => client === cl.name));
  }

  sendNewClient(f: NgForm){
    let array = Object.keys(f.value).filter(key => f.value[key]).map(key => key)
    array.forEach(val => this.produccionCode.fillClientOrder(val));
    this.openClients = false;
  }

  gotoMarket(){
    this.router.navigate(['tabs/produccion/mercado']);
  }

  setDateDelivery(date: Date){
    console.log(date);
  }

}
