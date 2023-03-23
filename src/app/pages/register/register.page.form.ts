import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { findAddressNumber, findCity, findNeighborhood, findState, findStreet, findZipCode } from "./service.utils";

export class RegisterPageForm {

    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm(): FormGroup {
        let form = this.formBuilder.group({
            name: ['', [Validators.required]],
            mail: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            repeatPass: [''],
            phone: ['', [Validators.required]],
            address: this.formBuilder.group({
                street: ['', [Validators.required]],
                number: ['', [Validators.required]],
                zipCode: ['', [Validators.required]],
                state: ['', [Validators.required]],
                neighborhood: ['', [Validators.required]],
                city: ['', [Validators.required]]
            })
        });

        form.get('repeatPass').setValidators(matchPassAndRepeatPass(form));

        return form;
    }

    setAddress(place: any){
        const addressForm = this.form.get('address');

        addressForm.get('street').setValue(findStreet(place.address_components));
        addressForm.get('number').setValue(findAddressNumber(place.address_components));
        addressForm.get('zipCode').setValue(findZipCode(place.address_components));
        addressForm.get('state').setValue(findState(place.address_components));
        addressForm.get('city').setValue(findCity(place.address_components));
        addressForm.get('neighborhood').setValue(findNeighborhood(place.address_components));
    }

    getForm(): FormGroup {
        return this.form;
    }
}

function matchPassAndRepeatPass(form: FormGroup): ValidatorFn {
    const password = form.get('password');
    const repeatPass =  form.get('repeatPass');

    const validator = () => {
        return password.value == repeatPass.value ? null : {isntMatching: true}
    };

    return validator;
}