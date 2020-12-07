import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {CurrentStoreComponent} from '@app/shared/current-store/current-store.component';
import {StoreService} from '@app/services';
import {Store} from '@app/models/store';

describe('CurrentStoreComponent', () => {

  let component: CurrentStoreComponent;
  let fixture: ComponentFixture<CurrentStoreComponent>;
  let httpTestingController: HttpTestingController;
  let service: StoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentStoreComponent, ],
      providers: [StoreService, ],
      imports: [HttpClientTestingModule, RouterTestingModule, ]
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.clear();

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(StoreService);

    fixture = TestBed.createComponent(CurrentStoreComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets preferred store as first warehouse, if non previously saved', () => {

    expect(component.preferredStore).toBeNull();
    expect(service.preferredStore).toBeNull();

    const req = httpTestingController.expectOne('/fulfillment/warehouse/?per_page=250');

    component.ngOnInit();

    req.flush(API_RESPONSE);

    const firstStore = component.allStores[0];

    expect(component.preferredStore).toEqual(firstStore);
    expect(service.preferredStore).toEqual(firstStore);
  });

  it('sets preferredStore to value from localStorage when present', () => {

    const preferredStore: Store = API_RESPONSE[1] as Store;
    localStorage.setItem('preferredStore', JSON.stringify(preferredStore));

    expect(component.preferredStore).toBeNull();
    expect(service.preferredStore).toEqual(preferredStore);

    const req = httpTestingController.expectOne('/fulfillment/warehouse/?per_page=250');

    component.ngOnInit();

    req.flush(API_RESPONSE);

    expect(component.preferredStore).toEqual(preferredStore);
    expect(service.preferredStore).toEqual(preferredStore);
  });

});


const API_RESPONSE = [
  {
    'href': 'https://bhisma.cloud/api/fulfillment/warehouse/1/',
    'address': {
      'country': 'id',
      'province': 'daerah khusus ibukota jakarta',
      'city': 'jakarta barat',
      'district': 'grogol',
      'subDistrict': 'grogol petamburan',
      'street': 'Letjen S. Parman St No.28',
      'postalCode': '11450',
      'latitude': '0.000000000',
      'longitude': '0.000000000',
      'notes': 'This is a warehouse.  It\'s great.'
    },
    'subLocations': [
      {
        'href': 'https://bhisma.cloud/api/fulfillment/sub-location/10/',
        'name': 'default',
        'code': 'default',
        'type': 'omni_channel'
      },
      {
        'href': 'https://bhisma.cloud/api/fulfillment/sub-location/12/',
        'name': 'Hold',
        'code': 'hold',
        'type': 'hold'
      },
      {
        'href': 'https://bhisma.cloud/api/fulfillment/sub-location/11/',
        'name': 'Offline Only Stock',
        'code': 'offline-only',
        'type': 'offline_only'
      }
    ],
    'name': 'Taman Anggrek',
    'code': '10101',
    'type': 'permanent',
    'internalNotes': '',
    'financialReportingAs': null,
    'allowReassignmentFrom': [
      'https://bhisma.cloud/api/fulfillment/warehouse/2/'
    ]
  },
  {
    'href': 'https://bhisma.cloud/api/fulfillment/warehouse/2/',
    'address': {
      'country': 'id',
      'province': 'bali',
      'city': 'jembrana',
      'district': 'budeng',
      'subDistrict': 'jembrana',
      'street': '9850 Summerset Ave',
      'postalCode': '82218',
      'latitude': null,
      'longitude': null,
      'notes': ''
    },
    'subLocations': [
      {
        'href': 'https://bhisma.cloud/api/fulfillment/sub-location/9/',
        'name': 'sl1',
        'code': 'sl1',
        'type': 'omni_channel'
      },
      {
        'href': 'https://bhisma.cloud/api/fulfillment/sub-location/30/',
        'name': 'SL2',
        'code': 'sl2',
        'type': 'omni_channel'
      },
      {
        'href': 'https://bhisma.cloud/api/fulfillment/sub-location/31/',
        'name': 'SL3',
        'code': 'sl3',
        'type': 'omni_channel'
      },
      {
        'href': 'https://bhisma.cloud/api/fulfillment/sub-location/32/',
        'name': 'SL4',
        'code': 'sl4',
        'type': 'omni_channel'
      },
      {
        'href': 'https://bhisma.cloud/api/fulfillment/sub-location/33/',
        'name': 'SL5',
        'code': 'sl5',
        'type': 'omni_channel'
      }
    ],
    'name': 'Test Pop-Up',
    'code': '10102',
    'type': 'pop_up',
    'internalNotes': 'https://bhisma.cloud/api/fulfillment/warehouse/1/',
    'financialReportingAs': null,
    'allowReassignmentFrom': []
  },
  {
    'href': 'https://bhisma.cloud/api/fulfillment/warehouse/3/',
    'address': {
      'country': 'id',
      'province': 'aceh',
      'city': 'aceh barat',
      'district': 'alue bagok',
      'subDistrict': 'arongan lambalek',
      'street': '9850 Street',
      'postalCode': '23652',
      'latitude': null,
      'longitude': null,
      'notes': ''
    },
    'subLocations': [],
    'name': 'WH 3',
    'code': '01013',
    'type': 'permanent',
    'internalNotes': '',
    'financialReportingAs': null,
    'allowReassignmentFrom': []
  }
];
