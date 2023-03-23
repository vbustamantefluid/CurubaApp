import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Client } from '../models/client';

@Injectable({ providedIn: 'root' }) export class ClientService {

  constructor(private cloud: AngularFirestore){}

  Clients = this.cloud.firestore.collection('clients');
  clients = [] as Client[];
  selectedClient = {} as Client;

  getClients(){
    this.Clients.onSnapshot(clientSnapShot => {
      clientSnapShot.docChanges().forEach(change => {
        let client = change.doc.data() as Client;
        let index = this.clients.findIndex(us => us.id === client.id);
        if(change.type === 'added' && index === -1) this.clients.push(client);
        if(change.type === 'modified') this.clients.splice(index, 1, client);
        if(change.type === 'removed') this.clients.splice(index, 1);
      });
      this.clients = this.clients
        .sort((a,b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
//        .sort((a,b) => a.type > b.type ? 1 : a.type < b.type ? -1 : 0)
        .sort((a,b) => a.active > b.active ? -1 : a.active < b.active ? 1 : 0)
    });
  }

  addClient(client: Client){ 
    client.id = Date.now().toString();
    this.Clients.doc(client.id).set(client).then().catch(err => console.log(err));
  }

  updateClient(client: Client){
    this.Clients.doc(client.id).update(client).then().catch(err => console.log(err));
  }

  deleteClient(id: string) {
    this.Clients.doc(id).delete().then().catch(err => console.log(err));
  }


}