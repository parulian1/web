import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Address } from '@app/models/addresses';
import { AddressService } from '@app/services/address.service';
import { ProfileService } from '@app/services/profile.service';
import { PagedResponse } from '@app/core/pagination';
import { AddressFormDialogComponent, AddressDeleteDialogComponent } from './containers';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.scss'],
})
export class ListAddressComponent implements OnInit {
  page: PagedResponse<Address>;
  entities: Address[] = [];

  constructor(
    public dialog: MatDialog,
    private profileService: ProfileService,
    private addressService: AddressService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((result) => {
      this.page = result.page;
      this.entities = result.page.entities;
    });
  }

  showFormDialog(address?: Address): void {
    const dialog = this.dialog.open(AddressFormDialogComponent, {
      data: { address: address || {}, isUpdated: !!address },
      width: '540px',
      height: '640px',
    });

    dialog.afterClosed().subscribe((result) => {
      if (result && result.isSuccess) {
        this.refreshPage();
      }
    });
  }

  deleteAddress(address: Address): void {
    this.addressService.destroy(address.href).subscribe(() => {
      this.refreshPage();
    });
  }

  showDeleteDialog(address: Address): void {
    const dialog = this.dialog.open(AddressDeleteDialogComponent, {
      data: { address },
      width: '464px',
      height: '190px',
    });

    dialog.afterClosed().subscribe((isDeleted) => {
      if (isDeleted) {
        this.deleteAddress(address);
      }
    });
  }

  fetchAddresses() {
    this.profileService.fetchListAddresses().subscribe((result) => {
      this.entities = result.body;
    });
  }

  setAsDefaultShipping(address: Address): void {
    this.addressService.setDefaultShipping(address.href).subscribe(
      (result) => {
        // find index, and replace isDefaultShipping to false
        this.entities
          .filter((result) => result.isDefaultShipping === true)
          .forEach((result) => {
            result.isDefaultShipping = false;
          });

        const index = this.entities.findIndex((result) => result.href === address.href);
        this.entities[index].isDefaultShipping = true;
      },
      (err) => console.log('error', err)
    );
  }

  refreshPage(): void {
    this.router.navigate(['./'], {
      queryParams: { page: this.page?.pageNumber || 1 },
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }
}
