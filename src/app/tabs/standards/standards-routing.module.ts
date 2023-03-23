import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CostingComponent } from './costing/costing.component';
import { MercadoComponent } from '../standards/mercado/mercado.component';
import { PreciosComponent } from '../standards/precios/precios.component';
import { JugoStandardComponent } from './jugos-standard/jugo-standard/jugo-standard.component';
import { JugosStandardComponent } from './jugos-standard/jugos-standard.component';

import { StandardsPage } from './standards.page';
import { IngredienteComponent } from './mercado/ingrediente/ingrediente.component';

const routes: Routes = [
  {
    path: '',
    component: StandardsPage
  },
  {
    path: 'mercado',
    component: MercadoComponent
  },
  {
    path: 'mercado/ingrediente',
    component: IngredienteComponent
  },
  {
    path: 'jugos-standard',
    component: JugosStandardComponent
  },
  {
    path: 'jugos-standard/jugo-standard',
    component: JugoStandardComponent,
  },
  {
    path: 'precios',
    component: PreciosComponent,
  },
  {
    path: 'costos',
    component: CostingComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandardsPageRoutingModule {}
