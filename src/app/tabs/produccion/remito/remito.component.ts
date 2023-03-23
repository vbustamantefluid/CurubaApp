import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ProdDayService } from 'src/app/services/prod-day.service';

@Component({
  selector: 'app-remito',
  templateUrl: './remito.component.html',
  styleUrls: ['./remito.component.scss'],
})
export class RemitoComponent {

  constructor(
    public clientService: ClientService,
    public prodDayService: ProdDayService
  ){}
}
