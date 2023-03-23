import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginPageForm } from "./login.page.form"

describe('LoginPageForm', () => {

    let loginPageForm: LoginPageForm;
    let form: FormGroup;

    beforeEach(() => {
        loginPageForm = new LoginPageForm(new FormBuilder());
        form = loginPageForm.createForm();
    })

    it('should create login form empty', () => {
        expect(form).not.toBeNull();
        expect(form.get('mail')).not.toBeNull();
        expect(form.get('mail').value).toEqual('');
        expect(form.get('mail').valid).toBeFalsy();

        expect(form.get('password')).not.toBeNull();
        expect(form.get('password').value).toEqual('');
        expect(form.get('password').valid).toBeFalsy();
    });

    it('should have mail invalid if mail is not valid', () => {
        form.get('mail').setValue('invalid mail');

        expect(form.get('mail').valid).toBeFalsy();
    });

    it('should have mail valid if mail is valid', () => {
        form.get('mail').setValue('valid@mail.com');

        expect(form.get('mail').valid).toBeTruthy();
    });

    it('should have a valid form', () => {
        form.get('mail').setValue('valid@mail.com');
        form.get('password').setValue('anypassword')

        expect(form.valid).toBeTruthy();
    })

})