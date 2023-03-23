import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppState } from "@capacitor/app";
import { IonicModule } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { StoreModule } from "@ngrx/store";
import { hide, show } from "src/store/loading/loading.actions";
import { loadingReducer } from "src/store/loading/loading.reducers";
import { LoadingComponent } from "./loading.component";

describe('LoadingComponent', () => {
    let component: LoadingComponent;
    let fixture: ComponentFixture<LoadingComponent>;
    let store: Store<AppState>;
    let page: HTMLElement;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ LoadingComponent ],
        imports: [
          IonicModule.forRoot(),
          StoreModule.forRoot([]),
          StoreModule.forFeature('loading', loadingReducer)
        ]
      });
      fixture = TestBed.createComponent(LoadingComponent);
      store = TestBed.inject(Store);
      
      component = fixture.componentInstance;
      page = fixture.nativeElement;
    });
  
    it('should hide loading component when it is not loading', () => {
      store.dispatch(hide());
      fixture.detectChanges();

      expect(page.querySelector('.backdrop')).toBeNull();
    });

    it('should show loading component when it is loading', () => {
      store.dispatch(show());
      fixture.detectChanges();

      expect(page.querySelector('.backdrop')).not.toBeNull();
    });

  });