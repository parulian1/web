import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {MatRadioChange} from '@angular/material/radio';
import {MatDialog} from '@angular/material/dialog';

import {Address, Addresses} from '@app/models/addresses';
import {Cart} from '@app/models/cart';
import {Area} from '@app/models/area';
import {AddressService, StateCheckout} from '@app/services';

import {CheckoutAddressFormDialogComponent} from '@app/pages/checkout/checkout-address/containers';


@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  @Output() addressChosen = new EventEmitter<Addresses>();

  addr: Addresses;
  defaultAddr: Addresses;
  listAddress: Array<Addresses>;
  addressPick: any;
  addressValue: Addresses[];
  panelOpenState = false;
  provinces: Area[];
  displayStatus = 'idle';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private service: AddressService,
              public stateService: StateCheckout) {
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { addresses: Addresses[], cart: Cart, defaultAddress: Addresses, provinces: Area[] }) => {
        this.provinces = data.provinces;
        this.listAddress = data.addresses;
        this.defaultAddr = this.listAddress.filter(m => m.isDefaultShipping === true)[0];
        this.addr = data.addresses.filter(m => m.isDefaultShipping === true)[0];
        this.addressChosen.emit(this.addr);

        if (data.addresses.length === 0) {
          this.displayStatus = 'list';
        }
      });

    this.addressPick = this.defaultAddr?.href;
    this.addressValue = this.listAddress.filter(m => m.href === this.addressPick);

    if (this.addressValue.length !== 0) {
      this.displayStatus = 'main';
    } else {
      this.displayStatus = 'list';
    }
  }

  onChange($event: MatRadioChange) {

    this.addressPick = $event.value;
  }

  togglePanel() {
    this.addressValue = this.listAddress.filter(m => m.href === this.addressPick);
    this.displayStatus = 'main';
    this.addressChosen.emit(this.addressValue[0]);
    this.stateService.err = [];
  }

  showAddressDialog(address?: Address) {
    const dialog = this.dialog.open(CheckoutAddressFormDialogComponent, {
      data: { address: address || {}, isUpdated: !!address },
      width: '540px',
      height: '640px',
    });

    dialog.afterClosed().subscribe((result) => {
      if (result && result.isSuccess) {
        this.service.fetchAddress().subscribe(resp => {
          this.updateListAndDefaultAddress(resp.body);
        });
      }
    });
  }

  updateListAndDefaultAddress(listAddress: Addresses[]) {
    this.listAddress = listAddress;
    this.defaultAddr = this.listAddress.filter(m => m.isDefaultShipping === true)[0];

    //
    this.addr = this.listAddress.filter(m => m.isDefaultShipping === true)[0];
    this.addressPick = this.defaultAddr?.href;
    this.addressValue = this.listAddress.filter(m => m.href === this.addressPick);
  }

  setActiveAddress() {
    this.displayStatus = 'list';
  }

  setMainAddress(href: string, mainAddress: TemplateRef<any>) {
    const dialogRef = this.dialog.open(mainAddress, {
      height: '100px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.setMainAddress(href).subscribe(() => {
          this.service.fetchAddress().subscribe(resp => {
            this.listAddress = resp.body;
            this.defaultAddr = this.listAddress.filter(m => m.isDefaultShipping === true)[0];
          });
        });
      }
    });
  }


}
