import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ingredient } from '../models/ingrediente';

@Injectable({ providedIn: 'root' }) export class IngredientService {

  constructor(private cloud: AngularFirestore){}

  Ingredients = this.cloud.firestore.collection('ingredients');
  ingredients = [] as Ingredient[];
  selectedIngredient = {} as Ingredient;
  
  newIngredient = false;

  getIngredients(){
    this.Ingredients.onSnapshot(ingredientSnapShot => {
      ingredientSnapShot.docChanges().forEach(change => {
        let ingredient = change.doc.data() as Ingredient;
        let index = this.ingredients.findIndex(us => us.id === ingredient.id);
        if(change.type === 'added' && index === -1) this.ingredients.push(ingredient);
        if(change.type === 'modified') this.ingredients.splice(index, 1, ingredient);
        if(change.type === 'removed') this.ingredients.splice(index, 1);
      });
      this.ingredients = this.ingredients
        .sort((a,b) => a.name > b.name ? +1 : a.name < b.name ? -1 : 0)
        .sort((a,b) => a.type > b.type ? +1 : a.type < b.type ? -1 : 0);
    });
  }

  addIngredient(ingredient: Ingredient){ 
    ingredient.id = Date.now().toString();
    ingredient.updated = Date.now().toString();
    this.Ingredients.doc(ingredient.id).set(ingredient).then().catch(err => console.log(err));
  }

  updateIngredient(ingredient: Ingredient){
    ingredient.updated = Date.now().toString();
    this.Ingredients.doc(ingredient.id).update(ingredient).then().catch(err => console.log(err));
  }

  deleteIngredient(id: string) {
    this.Ingredients.doc(id).delete().then().catch(err => console.log(err));
  }

}
