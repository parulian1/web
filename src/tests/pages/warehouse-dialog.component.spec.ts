import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseDialogComponent } from '@app/pages/product-detail/warehouse-dialog/warehouse-dialog.component';

describe('WarehouseDialogComponent', () => {
  let component: WarehouseDialogComponent;
  let fixture: ComponentFixture<WarehouseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
