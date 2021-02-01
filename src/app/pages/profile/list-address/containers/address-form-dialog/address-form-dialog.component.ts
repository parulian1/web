import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { AddressEntity } from "@app/pages/profile/list-address/entities/address.entity";
import { AddressService } from "@app/services/address.service";
import { Addresses } from "@app/models/addresses";
import { Area, District } from "@app/models";
import { AreaService } from "@app/services";
import { Logger } from "@app/core";

const logger = new Logger("address-form-dialog.component.ts");

@Component({
  selector: "app-address-form-dialog",
  templateUrl: "./address-form-dialog.component.html",
  styleUrls: ["./address-form-dialog.component.scss"],
})
export class AddressFormDialogComponent implements OnInit {
  public address: AddressEntity;
  public form: FormGroup;
  public showMap = false;

  // select choices
  stateChoices: Area[] = [];
  cityChoices: any = [];
  districtChoices: District[] = [];
  subDistrictChoices: any[];

  // default
  defaultName: string = "My Home";

  constructor(
    private fb: FormBuilder,
    private areaService: AreaService,
    private addressService: AddressService,

    public dialogRef: MatDialogRef<AddressFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { address: Addresses; isUpdated: boolean }
  ) {}

  ngOnInit() {
    this.initialForm();
    this.fetchStates(); // provinces
  }

  initialForm(): void {
    this.form = this.fb.group({
      name: [this.data.address.name || this.defaultName, [Validators.required]],
      shipToName: [this.data.address.shipToName || null, [Validators.required]],
      phoneNumber: [this.data.address.phoneNumber || null, [Validators.required]],

      // fill when selected method triggered
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      subDistrict: [null, [Validators.required]],
      district: [null, [Validators.required]],

      street: [this.data.address.street || null, [Validators.required, Validators.minLength(10)]],
      lat: [this.data.address?.latitude || null, [Validators.required]],
      lng: [this.data.address?.longitude || null, [Validators.required]],
    });
  }

  get name(): FormControl { return this.form.get('name') as FormControl; }
  get shipToName(): FormControl { return this.form.get('shipToName') as FormControl; }
  get phoneNumber(): FormControl { return this.form.get('phoneNumber') as FormControl; }
  get state(): FormControl { return this.form.get('state') as FormControl; }
  get city(): FormControl { return this.form.get('city') as FormControl; }
  get subDistrict(): FormControl { return this.form.get('subDistrict') as FormControl; }
  get district(): FormControl { return this.form.get('district') as FormControl; }
  get street(): FormControl { return this.form.get('street') as FormControl; }
  get lat(): FormControl { return this.form.get('lat') as FormControl; }
  get lng(): FormControl { return this.form.get('lng') as FormControl; }

  onSubmit(): void {
    if (this.form.valid) {
      const { name, shipToName, phoneNumber, state, city, district, street, lat, lng } = Object.assign(
        {},
        this.form.value
      );

      const address = new AddressEntity(
        name,
        shipToName,
        phoneNumber,
        state.name,
        city.name,
        district.district,
        district.postalCode,
        street,
        lat,
        lng
      );

      if (this.data.isUpdated) {
        // todo: on future, update method in AddressService
        //    maybe only use `href` as url parameter
        //    ex: this.addressService.update(`${address.href}`, address)
        this.addressService.update(this.data.address, address).subscribe(
          () => {
            this.dialogRef.close({ address, isCreated: false, isSuccess: true, href: this.data.address.href });
          },
          (err) => this._handleError(err)
        );
      } else {
        this.addressService.create(address).subscribe(
          (result) => {
            this.dialogRef.close({ address, isCreated: true, isSuccess: true, href: result.headers.get("location") });
          },
          (err) => this._handleError(err)
        );
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
  toggleShowMap(): void {
    this.showMap = !this.showMap;
  }

  _handleError(err) {
    if (err.status === 400) {
      this._setErrors(err.error);
    } else {
      logger.error("unexpected error:", err);
    }
  }
  _setErrors(error: any) {
    Object.keys(error).forEach((field: any) => {
      this.form.controls[field].setErrors({ fromServer: error[field][0] });
    });
  }

  // handle province, district, and zipCode
  fetchStates(params: {} = {}) {
    this.areaService.fetchProvinces().subscribe((result) => {
      this.stateChoices = result.body;

      // when updated
      if (this.data.isUpdated) {
        const index = this.stateChoices.findIndex((state) => state.name === this.data.address.state);
        if (index != -1) {
          this.form.get("state").setValue(this.stateChoices[index]);
        }
      }
    });
  }

  /* From Here, all methods processes to get state, city and subDistrict */
  /* `These code didn't bite you, just make you Fright` */
  selectedState(state: Area) {
    // fetch cityChoices
    this.areaService.fetchArea(state.href).subscribe((result) => {
      this.cityChoices = result.body;

      this.form.get("city").setValue(null);
      this.form.get("subDistrict").setValue(null);
      this.form.get("district").setValue(null);

      // when updated
      if (this.data.isUpdated) {
        const index = this.cityChoices.findIndex((city) => city.name === this.data.address.city);
        if (index != -1) {
          this.form.get("city").setValue(this.cityChoices[index]);
        }
      }
    });
  }

  selectedCity(city: Area) {
    if (city?.href) {
      this.areaService.fetchSubDistrict(city?.href).subscribe((result) => {
        this.subDistrictChoices = [...new Map(result.map((item) => [JSON.stringify(item), item])).values()]; // remove duplicate

        this.form.get("subDistrict").setValue(null);
        this.form.get("district").setValue(null);

        // when updated
        if (this.data.isUpdated) {
          // set value
          this.areaService.fetchDistrict(city.href).subscribe((result) => {
            const index = result.body.findIndex((district) => district.district === this.data.address.district);
            if (index != -1) {
              this.districtChoices = result.body.filter(
                (district) => district.subDistrict === result.body[index].subDistrict
              );
              const iDistrict = this.districtChoices.findIndex(
                (district) => district.district === this.data.address.district
              );
              if (iDistrict != -1) {
                const iSubDistrict = this.subDistrictChoices.findIndex(
                  (subDistrict) => subDistrict.name === this.districtChoices[iDistrict].subDistrict
                );
                if (iSubDistrict != -1) {
                  this.form.get("subDistrict").setValue(this.subDistrictChoices[iSubDistrict]);
                }
              }
            }
          });
        }
      });
    }
  }

  selectedSubDistrict(subDistrict: { name: string; cityHref?: string }) {
    if (subDistrict?.cityHref) {
      this.areaService.fetchDistrict(subDistrict.cityHref).subscribe((result) => {
        this.districtChoices = result.body.filter((district) => district.subDistrict === subDistrict.name);

        this.form.get("district").setValue(null);

        if (this.data.isUpdated) {
          const index = this.districtChoices.findIndex((district) => district.district === this.data.address.district);
          if (index != -1) {
            this.form.get("district").setValue(this.districtChoices[index]);
          }
        }
      });
    }
  }
}
