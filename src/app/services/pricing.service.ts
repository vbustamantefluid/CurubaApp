import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Prices } from '../models/prices';

@Injectable({ providedIn: 'root' }) export class PricingService {

  constructor(private cloud: AngularFirestore){}

  Prices = this.cloud.firestore.collection('prices');
  prices = [] as Prices[];
  selectedPrice = {} as Prices;

  getPrices(){
    this.Prices.onSnapshot(priceSnapShot => {
      priceSnapShot.docChanges().forEach(change => {
        let price = change.doc.data() as Prices;
        let index = this.prices.findIndex(pr => pr.id === price.id);
        if(change.type === 'added' && index === -1) this.prices.unshift(price);
        if(change.type === 'modified') this.prices.splice(index, 1, price);
        if(change.type === 'removed') this.prices.splice(index, 1);
      });
      this.selectedPrice = { ...this.prices[0] }
    });
  }

  addPrice(price: Prices){ 
    price.id = Date.now().toString();
    this.Prices.doc(price.id).set(price).then().catch(err => console.log(err));
  }

  deletePrice(id: string) {
    this.Prices.doc(id).delete().then().catch(err => console.log(err));
  }

}
