import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProdDay } from '../models/prodDay';

@Injectable({ providedIn: 'root' }) export class ProdDayService {

  constructor(private cloud: AngularFirestore){}

  ProdDays = this.cloud.firestore.collection('prodDays');
  prodDays = [] as ProdDay[];
  selectedProdDay = {} as ProdDay;
  printJuiceType: string;
  remito = '';

  getProdDays(){
    this.ProdDays.onSnapshot(prodDaySnapShot => {
      prodDaySnapShot.docChanges().forEach(change => {
        let prodDay = change.doc.data() as ProdDay;
        let index = this.prodDays.findIndex(us => us.id === prodDay.id);
        if(change.type === 'added' && index === -1) this.prodDays.push(prodDay);
        if(change.type === 'modified') this.prodDays.splice(index, 1, prodDay);
        if(change.type === 'removed') this.prodDays.splice(index, 1);
      });
      this.prodDays = this.prodDays
      .sort((a,b) => a.date < b.date ? +1 : a.date > b.date ? -1 : 0);
    });
  }

  addProdDay(prodDay: ProdDay){ 
    prodDay.id = Date.now().toString();
    this.ProdDays.doc(prodDay.id).set(prodDay).then().catch(err => console.log(err));
  }

  updateProdDay(prodDay: ProdDay){
    this.ProdDays.doc(prodDay.id).update(prodDay).then().catch(err => console.log(err));
  }

  deleteProdDay(id: string) {
    this.ProdDays.doc(id).delete().then().catch(err => console.log(err));
  }

}
