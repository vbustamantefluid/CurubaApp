import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clientes',
  templateUrl: 'clientes.page.html',
  styleUrls: ['clientes.page.scss']
})
export class ClientesPage {

  clients = [{name: 'a', active: true} as Client]

  constructor(
    private router: Router,
    public clientService: ClientService
  ){}

  new(){
    this.clientService.selectedClient = { contactInfo: {} } as Client;
    this.router.navigate(['tabs/clientes/cliente'])
  }

  editClient(client: Client){
    this.clientService.selectedClient = client;
    this.router.navigate(['tabs/clientes/cliente'])
  }

}
