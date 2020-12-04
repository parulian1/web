import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderHistoryService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '@app/models/order';
import { DatePipe } from '@angular/common'
import { PaymentMethod, PaymentMethodType } from '@app/models/payment-method';

@Component({
  selector: 'app-order-confirm',
  template: `
    <div class="order-confirm-wrapper">
      <mat-toolbar color="white">
        <mat-toolbar-row>
          <div class="mt-header-logo">
            <a [routerLink]="['']"><img src="assets/header/logo-mt.svg" alt="Martha Tilaar Logo"/></a>
          </div>
        </mat-toolbar-row>
      </mat-toolbar>

      <div class="container">
        <div class="">
          <h2>Konfirmasi Pembayaran</h2>
          <p>Isi form dibawah dengan lengkap untuk melakukan konfirmasi pembayaran</p>

          <!--
          orderNumber, orderDate, shippingName, transferAmount,
          transferTo, proofImage
          -->
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="field">
              <label class="label">Nomor Pesanan</label>
              <div class="control">
                <div class="select">
                  <select [formControl]="orderNumber" (change)="changeOrder($event)">
                    <option disabled value="">Pilih Nomor Pesanan</option>
                    <option *ngFor="let order of orderChoices" [ngValue]="order">
                      {{ order.orderNumber }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Tanggal Pesanan</label>
              <div class="control">
                <input class="input" [formControl]="orderDate" type="date" placeholder="Masukkan Tanggal Pesanan">
              </div>
            </div>

            <div class="field">
              <label class="label">Nama Pengirim</label>
              <div class="control">
                <input class="input" [formControl]="shippingName" type="text" placeholder="Masukkan Nama Pengirim">
              </div>
            </div>

            <div class="field">
              <label class="label">Jumlah Transfer</label>
              <div class="control">
                <input class="input" [formControl]="transferAmount" type="number" placeholder="Rp">
              </div>
            </div>

            <div class="field">
              <label class="label">Dikirim ke</label>
              <div class="control">
                <div class="select">
                  <select [formControl]="transferTo">
                    <option disabled value="">Pilih Rekening</option>
                    <option *ngFor="let payment of paymentChoices" [ngValue]="payment">
                      {{ payment.name }} - {{ payment.accountHoldNumber }} - {{ payment.accountNumber }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">Bukti Pembayaran</label>
              <div class="control">
                <div id="file-js-example" class="file has-name">
                  <label class="file-label">
                    <input class="file-input" [formControl]="proofImage" (change)="changeProofImage($event)" type="file"
                           name="resume">
                    <span class="file-cta">
                        <i class="material-icons icon-search">photo_camera</i>Upload File
                      </span>
                  </label>
                </div>
              </div>
              <label class="file-name">{{ proofImageHelpers.nameImage ? proofImageHelpers.nameImage : '' }}</label>
            </div>

            <div class="field">
              <button type="submit" class="btn-primary btn-full">Kirim</button>
              <button class="btn-outline btn-full"><a [routerLink]="['/profile/orders']" class="">Kembali</a></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  form: FormGroup;

  orderChoices: Order[] = [];
  paymentChoices: PaymentMethodType[] = [];

  proofImageHelpers = {
    base64: '',
    nameImage: '',
  }

  constructor(
    private fb: FormBuilder,
    private orderHistoryService: OrderHistoryService,
    private router: Router,
    private route: ActivatedRoute,
    public datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.initialForm();
    this.route.data.subscribe((data: { choices: { orders: Order[], payments: PaymentMethod[] } }) => {
      this.orderChoices = data.choices.orders || [];
      this.paymentChoices = data.choices.payments
        .filter(p => p.type === 'manual_transfer')
        .map(p => p.paymentMethods)[0] || [];
    });
  }

  initialForm(): void {
    this.form = this.fb.group({
      orderNumber: ['', [Validators.required]],
      orderDate: ['', [Validators.required]],
      shippingName: ['', [Validators.required]],
      transferAmount: ['', [Validators.required]],
      transferTo: ['', [Validators.required]],
      proofImage: ['', [Validators.required]],
    })
  }

  get orderNumber(): FormControl {
    return this.form.get('orderNumber') as FormControl;
  }

  get orderDate(): FormControl {
    return this.form.get('orderDate') as FormControl;
  }

  get shippingName(): FormControl {
    return this.form.get('shippingName') as FormControl;
  }

  get transferAmount(): FormControl {
    return this.form.get('transferAmount') as FormControl;
  }

  get transferTo(): FormControl {
    return this.form.get('transferTo') as FormControl;
  }

  get proofImage(): FormControl {
    return this.form.get('proofImage') as FormControl;
  }

  // Changes
  changeOrder(e): void {
    this.orderDate.setValue(
      this.datePipe.transform(this.orderNumber.value.created, 'yyyy-MM-dd'),
      {onlySelf: true}
    );
  }

  changeProofImage(e): void {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.proofImageHelpers.base64 = reader.result as string;
      this.proofImageHelpers.nameImage = file.name;
    }
  }

  // modified value of `form`, so that support to payment confirmation api's
  get formData(): any {
    return {
      ...this.form.value,
      proofImage: this.proofImageHelpers.base64,
      orderNumber: this.orderNumber.value.orderNumber,
      orderDate: this.orderNumber.value.created,
      transferTo: this.transferTo.value.href,
    };
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.formData;
      this.orderHistoryService.createOrderPaymentConfirm(formData.orderNumber, formData).subscribe(() => {
        alert('success to create payment confirmation');
        this.router.navigate([`/profile/orders/${formData.orderNumber}`]);
      }, error => this._handleError(error));
    }
  }

  _handleError(error): void {
    alert('error');
  }
}
