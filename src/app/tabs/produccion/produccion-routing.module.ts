import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComandaComponent } from './comanda/comanda.component';
import { MarketComponent } from './market/market.component';
import { ProduccionCardComponent } from './produccion-card/produccion-card.component';
import { ProduccionPage } from './produccion.page';
import { ProductionDayComponent } from './production-day/production-day.component';
import { ProductionComponent } from './production/production.component';
import { RemitoComponent } from './remito/remito.component';

const routes: Routes = [
  {
    path: '',
    component: ProduccionPage,
  },
  {
    path: 'diaprod',
    component: ProductionDayComponent,
  },
  {
    path: 'nuevoDiaProd',
    component: ProduccionCardComponent,
  },
  {
    path: 'producir',
    component: ProductionComponent,
  },
  {
    path: 'comanda',
    component: ComandaComponent,
  },
  {
    path: 'mercado',
    component: MarketComponent,
  },
  {
    path: 'remito',
    component: RemitoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduccionPageRoutingModule {}
