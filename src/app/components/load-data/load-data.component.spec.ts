import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoadDataComponent } from "./load-data.component";

describe('Load-data', () => {
  let fixture: ComponentFixture<LoadDataComponent>;

  it('should exist ion-spinner', () => {
    fixture = TestBed.createComponent(LoadDataComponent);
    expect(fixture.nativeElement.querySelector('ion-spinner')).not.toBeNull();
  });

});