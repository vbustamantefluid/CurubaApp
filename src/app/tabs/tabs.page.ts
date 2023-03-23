import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/auth/users.service';
import { ClientService } from '../services/client.service';
import { IngredientService } from '../services/ingredient.service';
import { ManpowerService } from '../services/manpower.service';
import { PricingService } from '../services/pricing.service';
import { ProdDayService } from '../services/prod-day.service';
import { StandardService } from '../services/standard.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  backend = true;

  constructor(
    private pricingService: PricingService,
    private clientService: ClientService,
    private ingredientService: IngredientService,
    private standardService: StandardService,
    private userService: UserService,
    private prodDayService: ProdDayService,
    private manpowerService: ManpowerService
  ){}

  ngOnInit(): void {
    if(this.backend){
      this.pricingService.getPrices();
      this.clientService.getClients();
      this.ingredientService.getIngredients();
      this.standardService.getStandard();
      this.userService.getUsers();
      this.prodDayService.getProdDays();
      this.manpowerService.getManpower();
    }
  }
  
}
