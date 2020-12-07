import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Voucher} from '@app/models';

@Component({
  selector: 'app-voucher-card',
  templateUrl: './voucher-card.component.html',
  styleUrls: ['./voucher-card.component.scss']
})
export class VoucherCardComponent implements OnInit {
  voucherForm: FormGroup;
  voucher: Voucher;
  isButtonDisabled: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
    this.isButtonDisabled = true;
  }

  initForm() {
    this.voucherForm = new FormGroup({
      'voucher': new FormControl('')
    });
  }

  submitVoucher() {
    // TODO: check validation of voucher code
  }
}
