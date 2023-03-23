import { FormBuilder, FormGroup } from "@angular/forms";
import { RegisterPageForm } from "./register.page.form"

describe('RegisterPageForm', () => {
    let registerPageForm: RegisterPageForm;
    let form: FormGroup;

    beforeEach(() => {
        registerPageForm = new RegisterPageForm(new FormBuilder());
        form = registerPageForm.getForm();
    });

    it('should create register form empty', () => {
        expect(form).not.toBeNull();
        
        expect(form.get('name')).not.toBeNull();
        expect(form.get('name').value).toEqual('');
        expect(form.get('name').valid).toBeFalsy();

        expect(form.get('mail')).not.toBeNull();
        expect(form.get('mail').value).toEqual('');
        expect(form.get('mail').valid).toBeFalsy();

        expect(form.get('password')).not.toBeNull();
        expect(form.get('password').value).toEqual('');
        expect(form.get('password').valid).toBeFalsy();

        expect(form.get('repeatPass')).not.toBeNull();
        expect(form.get('repeatPass').value).toEqual('');

        expect(form.get('phone')).not.toBeNull();
        expect(form.get('phone').value).toEqual('');
        expect(form.get('phone').valid).toBeFalsy();

        expect(form.get('address.street')).not.toBeNull();
        expect(form.get('address.street').value).toEqual('');
        expect(form.get('address.street').valid).toBeFalsy();

        expect(form.get('address.number')).not.toBeNull();
        expect(form.get('address.number').value).toEqual('');
        expect(form.get('address.number').valid).toBeFalsy();

        expect(form.get('address.zipCode')).not.toBeNull();
        expect(form.get('address.zipCode').value).toEqual('');
        expect(form.get('address.zipCode').valid).toBeFalsy();

        expect(form.get('address.state')).not.toBeNull();
        expect(form.get('address.state').value).toEqual('');
        expect(form.get('address.state').valid).toBeFalsy();

        expect(form.get('address.neighborhood')).not.toBeNull();
        expect(form.get('address.neighborhood').value).toEqual('');
        expect(form.get('address.neighborhood').valid).toBeFalsy();

        expect(form.get('address.city')).not.toBeNull();
        expect(form.get('address.city').value).toEqual('');
        expect(form.get('address.city').valid).toBeFalsy();
    });

    it('should invalid mail be not valid', () => {
        form.get('mail').setValue('invalidmail');

        expect(form.get('mail').valid).toBeFalse();
    });

    it('should valid mail be valid', () => {
        form.get('mail').setValue('valid@mail.com');

        expect(form.get('mail').valid).toBeTrue();
    });

    it('should password less than 6 characters be invalid', () => {
        form.get('password').setValue('12345');

        expect(form.get('password').valid).toBeFalse();
    });

    it('should password different from repeat password be invalid', () => {
        form.get('password').setValue('anyPassword');
        form.get('repeatPass').setValue('otherPassword');

        expect(form.get('repeatPass').valid).toBeFalse();
    });

    it('should form be valid', () => {     
        form.get('name').setValue('name');
        form.get('mail').setValue('valid@mail.com');
        form.get('password').setValue('password');
        form.get('repeatPass').setValue('password');
        form.get('phone').setValue('123456');
        form.get('address').get('street').setValue('street');
        form.get('address').get('number').setValue('1234');
        form.get('address').get('zipCode').setValue('zipCode');
        form.get('address').get('state').setValue('state');
        form.get('address').get('neighborhood').setValue('neighborhood');
        form.get('address').get('city').setValue('city');
    
        expect(form.valid).toBeTruthy();
    });

});