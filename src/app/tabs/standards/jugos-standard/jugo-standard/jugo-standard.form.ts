import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StandardService } from "src/app/services/standard.service";

export class JugoStandardForm {

    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(
        public standardService: StandardService,
        formBuilder: FormBuilder
    ){
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm(): FormGroup {
        let form = this.formBuilder.group({
            type: [this.standardService.selectedStandard.type, [Validators.required]],
            name: [this.standardService.selectedStandard.name, [Validators.required]],
            code: [this.standardService.selectedStandard.code, [Validators.required]],
            active: [this.standardService.selectedStandard.active],
            color: [this.standardService.selectedStandard.color]
        });
        return form;
    }

    getForm(): FormGroup {
        return this.form;
    }
}
