import { EventEmitter, Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { ResellerSavedCatalogItem } from '@app/models';

@Component({
  selector: 'app-saved-catalog-qty',
  templateUrl: './saved-catalog-qty.component.html',
})

export class SavedCatalogQtyComponent implements OnInit, DoCheck {
  @Input() catalogItem: ResellerSavedCatalogItem;
  @Output() quantityFilled = new EventEmitter<boolean>();
  @Output() getShipment = new EventEmitter();

  isExceeded = false;
  isComma = false;
  isNull = false;
  isZero = false;

  constructor() {
  }

  public get selectedQty(): number {
    return this.catalogItem.quantity;
  }

  public set selectedQty(value: number) {
    if (value <= 0) {
      this.isZero = true;
    } else if (value !== this.selectedQty) {
      this.catalogItem.quantity = value;
      this.getShipment.emit();
      this.isNull = false;
      this.isZero = false;
    }
  }

  ngOnInit(): void {
  }

  increase() {
    this.selectedQty++;
    this.getShipment.emit();
  }

  decrease() {
    this.selectedQty--;
    this.getShipment.emit();
  }

  ngDoCheck(): void {
    this.checkQtyValue();
    this.isExceeded = this.selectedQty > this.catalogItem.availableStock;

  }

  checkQtyValue() {
    const regx = /^\d+$/.exec(String(this.selectedQty));
    this.isComma = !regx;
  }


  validationCheck() {
    if (!this.isZero && !this.isNull && !this.isComma && !this.isExceeded) {
      this.quantityFilled.emit(true);
    } else {
      this.quantityFilled.emit(false);
    }
  }

}
