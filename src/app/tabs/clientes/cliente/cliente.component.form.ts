import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientService } from "src/app/services/client.service";

export class NewClientComponentForm {

    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(
        public clientService: ClientService,
        formBuilder: FormBuilder
    ){
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    createForm(): FormGroup {
        let form = this.formBuilder.group({
            name: [this.clientService.selectedClient.name, [Validators.required]],
            type: [this.clientService.selectedClient.type, [Validators.required]],
            active: [this.clientService.selectedClient.active],
            iva: [this.clientService.selectedClient.iva],
            seals: [this.clientService.selectedClient.seals],
            caliber: [this.clientService.selectedClient.caliber, [Validators.required]],
            typeJuices: [this.clientService.selectedClient.typeJuices, [Validators.required]],
            contactInfo: this.formBuilder.group({
                address: [this.clientService.selectedClient.contactInfo.address],
                phone: [this.clientService.selectedClient.contactInfo.phone],
                mail: [this.clientService.selectedClient.contactInfo.mail],
                contact: [this.clientService.selectedClient.contactInfo.contact],
                zone: [this.clientService.selectedClient.contactInfo.zone],
                cuit: [this.clientService.selectedClient.contactInfo.cuit]
            })
        });
        return form;
    }

    getForm(): FormGroup {
        return this.form;
    }
}
