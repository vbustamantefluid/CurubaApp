import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProduccionPageRoutingModule } from './produccion-routing.module';
import { ProductionDayComponent } from './production-day/production-day.component';
import { ProduccionPage } from './produccion.page';
import { ProductionComponent } from './production/production.component';
import { LoadDataModule } from 'src/app/components/load-data/load-data.module';
import { ComandaComponent } from './comanda/comanda.component';
import { ProduccionCardComponent } from './produccion-card/produccion-card.component';
import { MarketComponent } from './market/market.component';
import { RemitoComponent } from './remito/remito.component';
import { RemitoDataComponent } from './remito/remito-data/remito-data.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProduccionPageRoutingModule,
    LoadDataModule
  ],
  declarations: [
    ProduccionPage,
    ProductionDayComponent,
    ProductionComponent,
    ComandaComponent,
    ProduccionCardComponent,
    MarketComponent,
    RemitoComponent,
    RemitoDataComponent
  ]
})
export class ProduccionPageModule {}
