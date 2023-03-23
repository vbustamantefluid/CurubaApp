import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Caliber, ClientOrder, Juice, ProdDay } from 'src/app/models/prodDay';
import { UserService } from 'src/app/services/auth/users.service';
import { ClientService } from 'src/app/services/client.service';
import { ProdDayService } from 'src/app/services/prod-day.service';
import { StandardService } from 'src/app/services/standard.service';
import { ProduccionCode } from '../produccion-code';

@Component({
  selector: 'app-produccion-card',
  templateUrl: './produccion-card.component.html',
  styleUrls: ['./produccion-card.component.scss'],
})
export class ProduccionCardComponent {

  date: Date;
  today = new Date().toISOString().slice(0, 10);

  constructor(
    public produccionCode: ProduccionCode,
    private router: Router,
    public userService: UserService,
    public standardService: StandardService,
    public clientService: ClientService,
    public prodDayService: ProdDayService
  ){}

  addProdDay(f: NgForm){ 
    if(f.value.date){
      this.prodDayService.selectedProdDay.date = f.value.date;
      this.prodDayService.selectedProdDay.status = 'pendiente';
      this.prodDayService.selectedProdDay.clientOrders = [] as ClientOrder[];
      this.prodDayService.selectedProdDay.production = [] as string[];
      this.prodDayService.selectedProdDay.delivery = [] as string[];

      Object.keys(f.value).filter(key => f.value[key]).map(key => key)
      .forEach(value => {
        this.produccionCode.fillClientOrder(value);
      });
      this.prodDayService.addProdDay(this.prodDayService.selectedProdDay);
      this.router.navigate(['tabs/produccion'])
    }
  }


}
