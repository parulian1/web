import {Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Logger} from '@app/core';
import {Area, District} from '@app/models';
import {Addresses} from '@app/models/addresses';
import {AddressService, AreaService} from '@app/services';
import {Router} from '@angular/router';
import {MatSelectChange} from '@angular/material/select';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EntityToSlugPipe} from '@app/shared/utils/entity-to-slug.pipe';
import {TitleCasePipe} from '@angular/common';
import {CredentialsService} from '@app/core/authentication';

const log = new Logger('AddAddressDialog');

@Component({
  selector: 'app-add-address-dialog',
  templateUrl: './add-address-dialog.component.html',
  styleUrls: ['./add-address-dialog.component.scss']
})
export class AddAddressDialogComponent implements OnInit {
  @ViewChild('googleMap', {static: false}) googleMap: google.maps.Map;
  @ViewChild('mapMarker', {static: false}) mapMarker: google.maps.Marker;

  isButtonDisabled: boolean;
  form: FormGroup;
  cities: Area[];
  districts: District[];
  zipCode: District[];
  subDistricts: any;
  mode = 'form';
  title: string;
  address: Addresses;

  /**
   * Google Maps Settings
   */
  zoom = 16;
  markers = [];
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
  };
  mapInfo = 'loading...';
  currLat = 0;
  currLng = 0;
  currLoc = '';

  @Output() addAddress = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<AddAddressDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private service: AreaService,
              private router: Router,
              private fb: FormBuilder,
              private addressService: AddressService,
              private pipe: EntityToSlugPipe,
              private pipe2: TitleCasePipe,
              private route: Router,
              private creds: CredentialsService) {
  }

  get name() {
    return this.form.get('name');
  }

  get shipToName() {
    return this.form.get('shipToName');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get state() {
    return this.form.get('state');
  }

  get city() {
    return this.form.get('city');
  }

  get district() {
    return this.form.get('district');
  }

  get zipcode() {
    return this.form.get('zipcode');
  }

  get street() {
    return this.form.get('street');
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.isButtonDisabled = true;
    if (this.data.action === 'EDIT') {
      this.setCities(this.data.address);
      this.getLoc(this.data.address);
      this.address = this.data.address;
      this.isButtonDisabled = false;
    } else {
      this.address = {
        city: '',
        district: '',
        phoneNumber: '',
        shipToName: '',
        state: '',
        street: '',
        zipcode: '',
        name: '',
        latitude: 0,
        longitude: 0
      };
    }
    this.initializeForm();
    this.initializeMap();
  }

  initializeForm() {
    this.form = this.fb.group({
      name: new FormControl(this.address.name,
        [
          Validators.required
        ]),
      shipToName: new FormControl(this.address.shipToName,
        [
          Validators.required,
          Validators.minLength(3)
        ]),
      phoneNumber: new FormControl(this.address.phoneNumber,
        [
          Validators.required,
        ]),
      state: new FormControl(this.address.state.toLowerCase(),
        [
          Validators.required,
        ]),
      city: new FormControl(this.address.city.toLowerCase(),
        [
          Validators.required
        ]),
      district: new FormControl(this.address.district.toLowerCase(),
        [
          Validators.required
        ]),
      zipcode: new FormControl(this.address.zipcode,
        [
          Validators.required
        ]),
      street: new FormControl(this.address.street,
        [
          Validators.required,
          Validators.minLength(10)
        ]),
      latitude: new FormControl(this.address.latitude, []),
      longitude: new FormControl(this.address.longitude, [])
    });
  }

  closeDialog() {
    if (this.mode === 'maps') {
      this.mode = 'form';
    } else {
      this.dialogRef.close();
    }
  }

  selectedProvince($event: MatSelectChange) {
    const provinceHref = this.data.provinces.filter(m => m.name === $event.value)[0].href;

    this.service.fetchArea(provinceHref).subscribe(res => {
      this.cities = res.body;
    });
  }

  selectedCity($event: MatSelectChange) {
    if (this.cities) {
      const cityHref = this.cities.filter(m => m.name === $event.value)[0].href;
      this.service.fetchDistrict(cityHref).subscribe(res => {
        this.districts = res.body;
        this.subDistricts = this.districts.map(m => m.subDistrict);
        this.subDistricts = [...new Set(this.subDistricts)];
        this.subDistricts.sort((a, b) => a > b ? 1 : -1);
      });
    }
  }

  selectedDistrict($event: MatSelectChange) {
    this.zipCode = this.districts.filter(m => m.subDistrict === $event.value);
  }

  submitAddress() {
    const data = this.form.value;
    data.country = 'IDN';
    data.latitude = data.latitude.toFixed(6);
    data.longitude = data.longitude.toFixed(6);

    if (this.data.action === 'ADD') {
      if (this.form.valid) {
        this.isButtonDisabled = false;
        this.service.addAddress(data).subscribe(() => {
          this.dialogRef.close('success');
        });
      }
    } else {
      const id = this.pipe.transform(this.address.href);
      this.service.updateAddress(data, id).subscribe(() => {
        this.dialogRef.close('success');
      });
    }
  }

  setCities(address: Addresses) {
    const provinceHref = this.data.provinces.filter(m => m.name === address.state.toLowerCase())[0].href;
    this.service.fetchArea(provinceHref).subscribe(res => {
      this.cities = res.body;
      this.setDistricts(this.cities, address);
    });
  }

  setDistricts(cities: Area[], address: Addresses) {
    if (cities) {
      const cityHref = cities.filter(m => m.name === address.city.toLowerCase())[0].href;
      this.service.fetchDistrict(cityHref).subscribe(res => {
        this.districts = res.body;
        this.subDistricts = this.districts.map(m => m.subDistrict);
        this.subDistricts = [...new Set(this.subDistricts)];
        this.subDistricts.sort((a, b) => a > b ? 1 : -1);
        this.setZipCode(this.districts, address);
      });
    }
  }

  setZipCode(districts: District[], address: Addresses) {
    this.zipCode = this.districts.filter(m => m.subDistrict === address.district.toLowerCase());
  }


  mapSelector() {
    this.mode = 'maps';
  }

  mapDrag($event: void) {
    this.mapInfo = 'loading...';
  }

  mapDragStart($event: void) {
    this.mapInfo = 'loading...';
  }

  mapDragEnd($event: void) {
    this.currLoc = this.googleMap.getCenter().lat() + ',' + this.googleMap.getCenter().lng();

    this.service.fetchPinLocation(this.currLoc.trim()).subscribe(res => {
      this.mapInfo = res.results[0].formatted_address;
    });

  }

  saveLoc() {

    if (this.currLoc || this.center) {
      this.currLat = this.googleMap.getCenter().lat() || this.center.lat;
      this.currLng = this.googleMap.getCenter().lng() || this.center.lng;
      this.currLoc = this.googleMap.getCenter().lat() + ',' + this.googleMap.getCenter().lng();

      this.service.fetchPinLocation(this.currLoc.trim()).subscribe(res => {
        this.mapInfo = res.results[0].formatted_address;
      });
    }

    this.form.patchValue({
      latitude: this.currLat,
      longitude: this.currLng
    });

    log.debug(this.form);

    this.mode = 'form';
  }


  initializeMap() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      this.markers.push({
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        label: {
          color: 'blue',
        },
        title: 'Marker Title',
        info: 'Marker Info',
        options: {
          animation: google.maps.Animation.DROP,
          draggable: true,
        }
      });

      const currLocs = position.coords.latitude + ',' + position.coords.longitude;

      this.service.fetchPinLocation(currLocs.trim()).subscribe(res => {
        this.mapInfo = res.results[0].formatted_address;
      });
    });
  }

  getLoc(address: any) {
    if (address) {
      this.currLat = address.latitude;
      this.currLng = address.longitude;
      this.currLoc = this.currLat + ',' + this.currLng;

      this.service.fetchPinLocation(this.currLoc.trim()).subscribe(res => {
        this.mapInfo = res.results[0].formatted_address;
      });
    }
  }
}
