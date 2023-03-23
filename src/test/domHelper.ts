import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export class DOMHelper<T> {
  fixture: ComponentFixture<T>;
  
  constructor(fixture: ComponentFixture<T>){
    this.fixture = fixture;
  }

  count(tagName: string): number{
    const elements = this.fixture.debugElement.queryAll(By.css(tagName));
    return elements.length;
  }

  doClick(tagName: string, order: number): void {
    this.fixture.debugElement.queryAll(By.css(tagName))[order - 1].nativeElement.click();
  }

  singleText(tagName: string): string {
    const el: HTMLElement = this.fixture.debugElement.nativeElement
    return el.querySelector(tagName).textContent;
  }
}