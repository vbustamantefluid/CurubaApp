import { ComponentFixture, TestBed } from "@angular/core/testing"
import { IonicModule } from "@ionic/angular";
import { UserService } from "../services/auth/users.service";
import { ClientService } from "../services/client.service";
import { IngredientService } from "../services/ingredient.service";
import { ManpowerService } from "../services/manpower.service";
import { PricingService } from "../services/pricing.service";
import { ProdDayService } from "../services/prod-day.service";
import { StandardService } from "../services/standard.service";
import { TabsPage } from "./tabs.page"
import { RouterTestingModule } from "@angular/router/testing"
import { DOMHelper } from "src/test/domHelper";
import { Router } from "@angular/router";

describe('TabsPage', () => {
  let fixture: ComponentFixture<TabsPage>;
  let component: TabsPage

  let userServiceMock: any;
  let clientServiceMock: any;
  let ingredientServiceMock: any;
  let manpowerServiceMock: any;
  let pricingServiceMock: any;
  let prodDayServiceMock: any;
  let standardServiceMock: any;

  let dh: DOMHelper<TabsPage>;
 
  beforeEach(() => {
    userServiceMock = jasmine.createSpyObj('UserService', ['getUsers']);
    clientServiceMock = jasmine.createSpyObj('ClientService', ['getClients']);
    ingredientServiceMock = jasmine.createSpyObj('IngredientService', ['getIngredients']);
    manpowerServiceMock = jasmine.createSpyObj('ManpowerService', ['getManpower']);
    pricingServiceMock = jasmine.createSpyObj('PricingService', ['getPrices']);
    prodDayServiceMock = jasmine.createSpyObj('ProdDayService', ['getProdDays']);
    standardServiceMock = jasmine.createSpyObj('StandardService', ['getStandard']);

    TestBed.configureTestingModule({
      declarations: [ TabsPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: ClientService, useValue: clientServiceMock },
        { provide: IngredientService, useValue: ingredientServiceMock },
        { provide: ManpowerService, useValue: manpowerServiceMock },
        { provide: PricingService, useValue: pricingServiceMock },
        { provide: ProdDayService, useValue: prodDayServiceMock },
        { provide: StandardService, useValue: standardServiceMock }
      ]
    });
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
  });

  it('should call all services only if backend is true', () => {
    fixture.detectChanges();

    if(component.backend){
      expect(userServiceMock.getUsers).toHaveBeenCalledTimes(1);
      expect(clientServiceMock.getClients).toHaveBeenCalledTimes(1);
      expect(ingredientServiceMock.getIngredients).toHaveBeenCalledTimes(1);
      expect(manpowerServiceMock.getManpower).toHaveBeenCalledTimes(1);
      expect(pricingServiceMock.getPrices).toHaveBeenCalledTimes(1);
      expect(prodDayServiceMock.getProdDays).toHaveBeenCalledTimes(1);
      expect(standardServiceMock.getStandard).toHaveBeenCalledTimes(1);    
    }

    if(!component.backend){
      expect(userServiceMock.getUsers).toHaveBeenCalledTimes(0);
      expect(clientServiceMock.getClients).toHaveBeenCalledTimes(0);
      expect(ingredientServiceMock.getIngredients).toHaveBeenCalledTimes(0);
      expect(manpowerServiceMock.getManpower).toHaveBeenCalledTimes(0);
      expect(pricingServiceMock.getPrices).toHaveBeenCalledTimes(0);
      expect(prodDayServiceMock.getProdDays).toHaveBeenCalledTimes(0);
      expect(standardServiceMock.getStandard).toHaveBeenCalledTimes(0);
    }
  });

  it('should be three buttons', () => {
    expect(dh.count('ion-tab-button')).toBe(3);
  });

  xit('should go to Clients when click on first button', () => {
    let router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    dh.doClick('ion-tab-button', 1);
    expect(router.navigateByUrl)
      .toHaveBeenCalledTimes(1);
  });

})