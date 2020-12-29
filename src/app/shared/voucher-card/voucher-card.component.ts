import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Voucher} from '@app/models';
import {CartService} from '@app/services';
import {CartDiscounts} from '@app/models/cart';

@Component({
  selector: 'app-voucher-card',
  templateUrl: './voucher-card.component.html',
  styleUrls: ['./voucher-card.component.scss']
})
export class VoucherCardComponent implements OnInit {
  public voucherForm: FormGroup;
  public voucherError = '';
  voucher: Voucher;


  @Output() voucherApplied = new EventEmitter<boolean>();
  @Input() public currentVoucher: Array<CartDiscounts>;


  constructor(public cartService: CartService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.voucherForm = new FormGroup({
      'voucher': new FormControl('')
    });
  }


  submitVoucher() {
    // TODO: check validation of voucher code
    this.cartService.applyVoucher(this.voucherForm.get('voucher').value).subscribe(resp => {
      this.voucherApplied.emit(true);
      this.voucherError = '';
    }, err => {
      this.voucherError = err.error.message;
      console.log(err.error);
    });
  }

  clearVoucher() {
    this.cartService.clearVoucher().subscribe(resp => {
      this.voucherApplied.emit(true);
    })
  }
}
