import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesPage } from './clientes.page';
import { ClientesPageRoutingModule } from './clientes-routing.module';
import { NewClientComponent } from './cliente/cliente.component';
import { ErrorMessageModule } from 'src/app/components/error-message/error-message.module';
import { LoadDataModule } from 'src/app/components/load-data/load-data.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientesPageRoutingModule, 
    ErrorMessageModule,
    LoadDataModule
  ],
  declarations: [
    ClientesPage,
    NewClientComponent
  ]
})
export class ClientesPageModule {}
