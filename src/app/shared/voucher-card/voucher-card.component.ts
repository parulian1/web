import {Component, OnInit, Input, Output, EventEmitter, DoCheck} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Voucher} from '@app/models';
import {CartService} from '@app/services';
import {CartDiscounts} from '@app/models/cart';

@Component({
  selector: 'app-voucher-card',
  templateUrl: './voucher-card.component.html',
  styleUrls: ['./voucher-card.component.scss']
})
export class VoucherCardComponent implements OnInit, DoCheck {
  public voucherForm: FormGroup;
  public voucherError = '';
  voucher: Voucher;
  isButtonDisabled: boolean;

  @Output() voucherApplied = new EventEmitter<boolean>();
  @Input() public currentVoucher: Array<CartDiscounts>;


  constructor(public cartService: CartService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngDoCheck(): void {
    this.isButtonDisabled = !this.voucherForm.valid;
  }

  initForm() {
    this.voucherForm = new FormGroup({
      'voucher': new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(1)
      ])
    });
  }


  submitVoucher() {
    // TODO: check validation of voucher code
    this.cartService.applyVoucher(this.voucherForm.get('voucher').value).subscribe(resp => {
      this.voucherApplied.emit(true);
      this.voucherError = '';
    }, err => {
      this.voucherError = err.error.message;
    });
  }

  clearVoucher() {
    this.cartService.clearVoucher().subscribe(resp => {
      this.voucherApplied.emit(true);
    })
  }
}
