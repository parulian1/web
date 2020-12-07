import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCartDialogComponent } from '@app/pages/cart/delete-cart-dialog/delete-cart-dialog.component';

describe('DeleteCartDialogComponent', () => {
  let component: DeleteCartDialogComponent;
  let fixture: ComponentFixture<DeleteCartDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCartDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
