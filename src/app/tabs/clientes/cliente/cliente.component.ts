import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Types } from 'src/app/classes/types';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { StandardService } from 'src/app/services/standard.service';
import { NewClientComponentForm } from './cliente.component.form';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class NewClientComponent implements OnInit {

  newClientForm: NewClientComponentForm;
  types = new Types;

  constructor(
    public standardService: StandardService,
    private toastController: ToastController,
    public clientService: ClientService,
    private router: Router,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(){
    this.newClientForm = new NewClientComponentForm(this.clientService, this.formBuilder);
  }

  sendClient(){
    this.newClientForm?.getForm().markAllAsTouched();

    if(this.newClientForm?.getForm().valid){
      if(this.clientService.selectedClient.id){
        let client = new Client;
        client = this.newClientForm.getForm().value;
        client.id = this.clientService.selectedClient.id;

        this.clientService.updateClient(client);
      } else {
        this.clientService.addClient(this.newClientForm.getForm().value as Client);
      }
      this.clientService.selectedClient = { contactInfo: {} } as Client;
      this.router.navigate(['tabs/clientes'])
    } else {
      this.toastController.create({
        message: 'Algo anduvo mal con el formulario...',
        duration: 4000,
        header: 'Carga fallida'
      }).then(toast => toast.present());
    }
  }

}
