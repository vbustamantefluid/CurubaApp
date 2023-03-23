import { TestBed } from "@angular/core/testing";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Client } from "src/app/models/client";
import { ClientService } from "src/app/services/client.service";
import { NewClientComponentForm } from "./cliente.component.form";

describe('NewClientComponentForm', () => {
    let component: NewClientComponentForm;
    let form: FormGroup;
    let clientService: ClientService;

    beforeEach(() => {
        component = new NewClientComponentForm(clientService, new FormBuilder());
        form = component.getForm();
        clientService = TestBed.inject(ClientService);
    });

    it('should create register form with selectedClient', () => {
        clientService.selectedClient = {} as Client;
        
        expect(form).not.toBeNull();
        
        expect(form.get('name')).not.toBeNull();
        expect(form.get('name').value).toEqual('');

        expect(form.get('type')).not.toBeNull();
        expect(form.get('type').value).toEqual(clientService.selectedClient.type);

        expect(form.get('active')).not.toBeNull();
        expect(form.get('active').value).toEqual(clientService.selectedClient.active);

        expect(form.get('iva')).not.toBeNull();
        expect(form.get('iva').value).toEqual(clientService.selectedClient.iva);

        expect(form.get('seals')).not.toBeNull();
        expect(form.get('seals').value).toEqual(clientService.selectedClient.seals);

        expect(form.get('caliber')).not.toBeNull();
        expect(form.get('caliber').value).toEqual(clientService.selectedClient.caliber);

        expect(form.get('typeJuices')).not.toBeNull();
        expect(form.get('typeJuices').value).toEqual(clientService.selectedClient.typeJuices);

        expect(form.get('contactInfo.address')).not.toBeNull();
        expect(form.get('contactInfo.address').value).toEqual(clientService.selectedClient.contactInfo.address);

        expect(form.get('address.phone')).not.toBeNull();
        expect(form.get('contactInfo.phone').value).toEqual(clientService.selectedClient.contactInfo.phone);

        expect(form.get('address.mail')).not.toBeNull();
        expect(form.get('contactInfo.mail').value).toEqual(clientService.selectedClient.contactInfo.mail);

        expect(form.get('address.contact')).not.toBeNull();
        expect(form.get('contactInfo.contact').value).toEqual(clientService.selectedClient.contactInfo.contact);

        expect(form.get('address.zone')).not.toBeNull();
        expect(form.get('contactInfo.zone').value).toEqual(clientService.selectedClient.contactInfo.zone);

        expect(form.get('address.cuit')).not.toBeNull();
        expect(form.get('contactInfo.cuit').value).toEqual(clientService.selectedClient.contactInfo.cuit);
    });

    it('should empty name be not valid', () => {
        form.get('name').setValue('');

        expect(form.get('mail').valid).toBeFalse();
    });

    it('should valid name be valid', () => {
        form.get('name').setValue('Quiero Verde');

        expect(form.get('name').valid).toBeTrue();
    });

    it('should empty type be not valid', () => {
        form.get('type').setValue('');

        expect(form.get('mail').valid).toBeFalse();
    });

    it('should valid type be valid', () => {
        form.get('type').setValue('Dietética');

        expect(form.get('type').valid).toBeTrue();
    });

    it('should empty caliber be not valid', () => {
        form.get('caliber').setValue([]);

        expect(form.get('caliber').valid).toBeFalse();
    });

    it('should valid caliber be valid', () => {
        form.get('caliber').setValue(['500']);

        expect(form.get('caliber').valid).toBeTrue();
    });

    it('should empty typeJuices be not valid', () => {
        form.get('typeJuices').setValue([]);

        expect(form.get('typeJuices').valid).toBeFalse();
    });

    it('should valid typeJuices be valid', () => {
        form.get('typeJuices').setValue(['Jugo Natural']);

        expect(form.get('typeJuices').valid).toBeTrue();
    });

    it('should form be valid if fill required fields', () => {     
        form.get('name').setValue('name');
        form.get('type').setValue('Dietética');
        form.get('caliber').setValue(['500']);
        form.get('typeJuices').setValue(['Jugo Natural']);

        expect(form.valid).toBeTruthy();
    });

});