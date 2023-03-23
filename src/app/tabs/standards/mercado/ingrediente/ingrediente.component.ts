import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Types } from 'src/app/classes/types';
import { Ingredient } from 'src/app/models/ingrediente';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.scss'],
})
export class IngredienteComponent {

  types = new Types;

  constructor(
    private router: Router,
    public alertController: AlertController,
    public ingredientService: IngredientService
  ){}

  addIngredient(){
    this.ingredientService.selectedIngredient.id ?
    this.ingredientService.updateIngredient(this.ingredientService.selectedIngredient) :
    this.ingredientService.addIngredient(this.ingredientService.selectedIngredient);

    this.ingredientService.selectedIngredient = {} as Ingredient;
    this.router.navigate(['/tabs/standards/mercado']);
  }

  async deleteIngredient(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cuidado!',
      message: 'Borrar ingrediente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Borrar',
          handler: () => {
            this.ingredientService.deleteIngredient(this.ingredientService.selectedIngredient.id);
            this.ingredientService.newIngredient = false;  
          }
        }
      ]
    });

    await alert.present();
  }

}
