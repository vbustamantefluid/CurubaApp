import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { ClientService } from "src/app/services/client.service";
import { ClientesPage } from "./clientes.page"
import { Client } from "src/app/models/client";
import { RouterTestingModule } from "@angular/router/testing";
import { DOMHelper } from "src/test/domHelper";
import { ErrorMessageModule } from "src/app/components/error-message/error-message.module";
import { IonicModule } from "@ionic/angular";
import { Component } from "@angular/core";

describe('ClientesPage', () => {
  let fixture: ComponentFixture<ClientesPage>;
  let dh: DOMHelper<ClientesPage>;
  let clientServiceMock: any;

  @Component({ template: ''}) class DummyComponent{}

  beforeEach(() => {
    clientServiceMock = jasmine.createSpyObj('ClientService', [''])

    TestBed.configureTestingModule({
      declarations: [ ClientesPage ],
      imports: [ 
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'tabs/clientes/cliente', component: DummyComponent}
        ]),
        ErrorMessageModule,
      ],
      providers: [
        { provide: ClientService, useValue: clientServiceMock }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ClientesPage);
    dh = new DOMHelper(fixture);
  });

  describe('Navigation', () => {
    let router: Router;

    beforeEach(() => {
      router = TestBed.inject(Router);
      spyOn(router, 'navigate');
    });

    it('on click New Client button, it should move to New Client page', () => {
      dh.doClick('ion-fab-button', 1);
  
      expect(router.navigate).toHaveBeenCalledWith(['tabs/clientes/cliente']);
    });

    it('on click on a client, it should move to New Client page', () => {
      clientServiceMock.clients = [new Client];
      fixture.detectChanges();
  
      dh.doClick('ion-fab-button', 1);

      expect(router.navigate).toHaveBeenCalledWith(['tabs/clientes/cliente']);
    });
  });

  describe('HTML', () => {

    it('on click New Client button, selectedClient should be { contactInfo{} }', () => {
      dh.doClick('ion-fab-button', 1);
      fixture.detectChanges();
  
      expect(clientServiceMock.selectedClient).not.toBeUndefined();
      expect(clientServiceMock.selectedClient.id).toBeUndefined();
      expect(clientServiceMock.selectedClient.name).toBeUndefined();
      expect(clientServiceMock.selectedClient.contactInfo).not.toBeUndefined();
    });

    it('on click on a client, selectedClient should be equal to client', () => {
      clientServiceMock.clients = [{
                                id: '1',
                                name: 'Quiero Verde'
                              }] as Client[];
      fixture.detectChanges();
  
      dh.doClick('ion-item', 1);
  
      expect(clientServiceMock.selectedClient).not.toBeUndefined();
      expect(clientServiceMock.selectedClient.id).toBe('1');
      expect(clientServiceMock.selectedClient.name).toBe('Quiero Verde');
    });

    it('should paint clients active to have opacity 1', () => {
      clientServiceMock.clients = [{ active: true }] as Client[];
  
      fixture.detectChanges();
  
      let opacity = fixture.debugElement.nativeElement.querySelectorAll('ion-item').item(0).style['opacity'];
  
      expect(opacity).toBe('1');
    });

    it('should paint clients not active to have opacity 0.5', () => {
      clientServiceMock.clients = [{ active: false }] as Client[];
  
      fixture.detectChanges();
  
      let opacity = fixture.debugElement.nativeElement.querySelectorAll('ion-item').item(0).style['opacity'];
  
      expect(opacity).toBe('0.5');
    });
  
  });

  describe('DOM', () => {
    let component: ClientesPage;

    beforeEach(() => {
      component = fixture.componentInstance;
    });

    it('on click New Client button, should call new() method', () => {
      spyOn(component, 'new');

      dh.doClick('ion-fab-button', 1);
      fixture.detectChanges();
  
      expect(component.new).toHaveBeenCalledTimes(1);
    });
  });

})