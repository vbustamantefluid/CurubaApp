import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StandardsPageRoutingModule } from './standards-routing.module';
import { StandardsPage } from './standards.page';
import { ErrorMessageModule } from 'src/app/components/error-message/error-message.module';
import { MercadoComponent } from '../standards/mercado/mercado.component';
import { IngredientComponent } from './jugos-standard/ingredient/ingredient.component';
import { IngredienteComponent } from './mercado/ingrediente/ingrediente.component';
import { JugosStandardComponent } from './jugos-standard/jugos-standard.component';
import { JugoStandardComponent } from './jugos-standard/jugo-standard/jugo-standard.component';
import { PreciosComponent } from '../standards/precios/precios.component';
import { CostingComponent } from './costing/costing.component';
import { LoadDataModule } from 'src/app/components/load-data/load-data.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StandardsPageRoutingModule,
    ErrorMessageModule,
    LoadDataModule
  ],
  declarations: [
    StandardsPage,
    MercadoComponent,
    IngredientComponent,
    IngredienteComponent,
    JugosStandardComponent,
    JugoStandardComponent,
    PreciosComponent,
    CostingComponent
  ]
})

export class StandardsPageModule {}
