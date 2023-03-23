import { TestBed } from "@angular/core/testing";
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore";
import { of } from "rxjs";
import { ClientService } from "./client.service";

describe('ClientService', () => {
  let clientServiceMock: any;
  let angularFirestoreMock: any;
  let fsCollecton: any;

  beforeEach(() => {
    clientServiceMock = jasmine.createSpyObj('ClientService', ['getClients']);
    
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['firestore', 'collection']);
    fsCollecton = jasmine.createSpyObj('collection', ['onSnapshot']);
    angularFirestoreMock.firestore.and.returnValue(of([]));
    angularFirestoreMock.firestore.collection.and.returnValue(fsCollecton);
    fsCollecton.onSnapshot.and.returnValue(of([]));

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule
      ],
      providers: [
        { provide: ClientService, useValue: clientServiceMock },
        { provide: AngularFirestore, useValue: angularFirestoreMock }
      ]
    });

    clientServiceMock = TestBed.inject(ClientService);
  });

  it('should be created', () => {
    expect(clientServiceMock).toBeTruthy();
  });

  it('should call collection and onSnapshot methods', () => {
    clientServiceMock.getClients();

    expect(angularFirestoreMock.firestore.collection).toHaveBeenCalledTimes(1);
  })

});