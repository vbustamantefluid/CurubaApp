import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, FormGroup } from "@angular/forms";
import { ErrorMessageComponent } from "./error-message.component"

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach((() => {
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    component.field = new FormGroup({ anyFiled: new FormControl() });
  }));

  it('should show error message on field touched and error present', () => {
    component.field.markAsTouched();
    component.field.setErrors({ anyError: true });
    component.error = "anyError";

    expect(component.showComponent()).toBeTruthy();
  });

  it('should hide error message on field not touched', () => {
    component.field.setErrors({ anyError: true });
    component.error = "anyError";

    expect(component.showComponent()).toBeFalsy();
  });

  it('should hide error message on field touched and no errors', () => {
    component.field.markAsTouched();

    expect(component.showComponent()).toBeFalsy(); 
  });

  it('should hide error message on field touched and error, but there is a different error', () => {
    component.field.markAsTouched();
    component.field.setErrors({ anyError: true });
    component.error = "anotherError";

    expect(component.showComponent()).toBeFalsy();
  });

})