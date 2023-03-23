import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-standards',
  templateUrl: './standards.page.html',
  styleUrls: ['./standards.page.scss'],
})
export class StandardsPage {

  constructor(private router: Router){}

  goTo(route: string){
    this.router.navigate([`tabs/standards/${ route }`])
  }

}
