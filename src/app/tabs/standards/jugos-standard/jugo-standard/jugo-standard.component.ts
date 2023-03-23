import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Types } from 'src/app/classes/types';
import { Ingred, Standard } from 'src/app/models/standard';
import { StandardService } from 'src/app/services/standard.service';
import { JugoStandardForm } from './jugo-standard.form';

@Component({
  selector: 'app-jugo-standard',
  templateUrl: './jugo-standard.component.html',
  styleUrls: ['./jugo-standard.component.scss'],
})
export class JugoStandardComponent implements OnInit {

  jugoStandardForm: JugoStandardForm;
  types = new Types

  constructor(
    public standardService: StandardService,
    private router: Router,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(){
    this.jugoStandardForm = new JugoStandardForm(this.standardService, this.formBuilder);
  }

  sendStandard(){
    this.jugoStandardForm.getForm().markAllAsTouched();

    if(this.jugoStandardForm.getForm().valid){
      this.standardService.selectedStandard.type = this.jugoStandardForm.getForm().get('type').value;
      this.standardService.selectedStandard.name = this.jugoStandardForm.getForm().get('name').value;
      this.standardService.selectedStandard.code = this.jugoStandardForm.getForm().get('code').value;
      this.standardService.selectedStandard.active = this.jugoStandardForm.getForm().get('active').value;
      this.standardService.selectedStandard.color = this.jugoStandardForm.getForm().get('color').value;

      this.standardService.selectedStandard.id ?
      this.standardService.updateStandard(this.standardService.selectedStandard) :
      this.standardService.addStandard(this.standardService.selectedStandard);
      
      this.standardService.selectedStandard = { ingredients: [{}]} as Standard;
      this.router.navigate(['tabs/standards/jugos-standard'])
    }
  }

  deleteIngredient(ingredient: Ingred){
    let index = this.standardService.selectedStandard.ingredients.findIndex(ing => ing === ingredient);
    this.standardService.selectedStandard.ingredients.splice(index, 1);
    if(!this.standardService.selectedStandard.ingredients[0])
    this.standardService.selectedStandard.ingredients[0] = {} as Ingred;
  }

}
