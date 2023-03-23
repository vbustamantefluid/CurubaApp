import { ComponentFixture, TestBed } from "@angular/core/testing"
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClientService } from "src/app/services/client.service";
import { NewClientComponent } from "./cliente.component";
import { RouterTestingModule } from "@angular/router/testing"
import { StandardService } from "src/app/services/standard.service";
import { Client } from "src/app/models/client";
import { IonicModule, ToastController } from "@ionic/angular";
import { DOMHelper } from "src/test/domHelper";
import { Router } from "@angular/router";
import { ErrorMessageModule } from "src/app/components/error-message/error-message.module";

describe('ClienteComponent', () => {
  let component: NewClientComponent;
  let fixture: ComponentFixture<NewClientComponent>;
  let dh: DOMHelper<NewClientComponent>;
  let toastController: ToastController;
  let standardServiceMock: any;
//  let clientServiceMock: any;
 
  class ClientServiceStub {
    clients = [] as Client[];
    selectedClient = { contactInfo: {} } as Client;
    addClient(){};
  }

  beforeEach(() => {
    standardServiceMock = jasmine.createSpyObj('StandardService', ['']);
//    clientServiceMock = jasmine.createSpyObj('ClientService', ['addClient', 'selectedClient']);
//    clientServiceMock.selectedClient.and.returnValue({ contactInfo: {} } as Client);

    TestBed.configureTestingModule({
      declarations: [ 
        NewClientComponent
      ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        ErrorMessageModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
  //      { provide: ClientService, useValue: clientServiceMock },
        { provide: ClientService, useClass: ClientServiceStub },
        { provide: StandardService, useValue: standardServiceMock },
      ]
    });
    fixture = TestBed.createComponent(NewClientComponent);
    dh = new DOMHelper(fixture);

    component = fixture.componentInstance;
  });

  it('should create component and form', () => {  
    fixture.detectChanges();
    expect(component).not.toBeUndefined();
    expect(component.newClientForm).not.toBeUndefined();
  });

  it('should be at least one ion-button tag', () => {
    expect(dh.count('ion-button')).toBeGreaterThanOrEqual(1);
  });

  it('should NOT be allowed to register with a void form', () => {
    let router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    dh.doClick('ion-button', 1);

    expect(router.navigate).toHaveBeenCalledTimes(0);
  });

  it('given form is valid, when click on register, then go to tabs/clients', () => {
    fixture.detectChanges();
    let router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fillForm();
    dh.doClick('ion-button', 1);

    expect(component.newClientForm.getForm().valid).toBeTruthy();

    expect(router.navigate).toHaveBeenCalledOnceWith(['tabs/clientes']);
  });

  it('should show an error when regisration fails', () => {
    fixture.detectChanges();
    toastController = TestBed.inject(ToastController);
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}))

    dh.doClick('ion-button', 1);

    expect(toastController.create).toHaveBeenCalled();
  });


  function fillForm() {
    let form = component.newClientForm.getForm();

    form.get('name').setValue('name');
    form.get('type').setValue('type');
    form.get('caliber').setValue('caliber');
    form.get('typeJuices').setValue('tipeJuices');
  }

})