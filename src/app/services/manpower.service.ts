import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Manpower } from '../models/manpower';

@Injectable({
  providedIn: 'root'
})
export class ManpowerService {

  constructor(private cloud: AngularFirestore){}

  Manpower = this.cloud.firestore.collection('manpower');
  manpower = [] as Manpower[];
  selectedManpower = {} as Manpower;

  getManpower(){
    this.Manpower.onSnapshot(manpowerSnapShot => {
      manpowerSnapShot.docChanges().forEach(change => {
        let manpower = change.doc.data() as Manpower;
        let index = this.manpower.findIndex(pr => pr.id === manpower.id);
        if(change.type === 'added' && index === -1) this.manpower.unshift(manpower);
        if(change.type === 'modified') this.manpower.splice(index, 1, manpower);
        if(change.type === 'removed') this.manpower.splice(index, 1);
      });
      this.selectedManpower = { ...this.manpower[0] }
    });
  }

  setManpower(manpower: Manpower){
    this.Manpower.doc(manpower.id).set(manpower).then().catch(err => console.log(err));
  }

}
