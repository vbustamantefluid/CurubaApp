import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ingred, Standard } from '../models/standard';

@Injectable({ providedIn: 'root' }) export class StandardService {

  constructor(private cloud: AngularFirestore){}

  Standards = this.cloud.firestore.collection('standard');
  standards = [] as Standard[];
  selectedStandard = {} as Standard;
  selectedIngred = {} as Ingred;

  getStandard(){
    this.Standards.onSnapshot(standardSnapShot => {
      standardSnapShot.docChanges().forEach(change => {
        let standard = change.doc.data() as Standard;
        let index = this.standards.findIndex(us => us.id === standard.id);
        if(change.type === 'added' && index === -1) this.standards.push(standard);
        if(change.type === 'modified') this.standards.splice(index, 1, standard);
        if(change.type === 'removed') this.standards.splice(index, 1);        
      });
      this.standards = this.standards
        .sort((a,b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
        .sort((a,b) => a.active > b.active ? -1 : a.active < b.active ? 1 : 0);
    });
  }

  addStandard(standard: Standard){ 
    standard.id = Date.now().toString();
    this.Standards.doc(standard.id).set(standard).then().catch(err => console.log(err));
  }

  updateStandard(standard: Standard){
    this.Standards.doc(standard.id).update(standard).then().catch(err => console.log(err));
  }

  deleteStandard(id: string){
    this.Standards.doc(id).delete().then().catch(err => console.log(err));
  }

}
