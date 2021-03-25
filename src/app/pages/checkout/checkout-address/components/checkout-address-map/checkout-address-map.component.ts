import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Addresses } from '@app/models/addresses';
import { AreaService } from '@app/services';

declare var google: any;

@Component({
  selector: 'app-checkout-address-map',
  template: `
    <div id="maps-search">
      <input #mapsInput id="maps-input" class="controls" type="text" placeholder="Cari lokasi">
      <i class="ion-ios-search-strong"></i>
    </div>
    <div class="maps-tooltip">
      <div class="info" [title]="infoMap">{{infoMap}}</div>
      <div class="arrow"></div>
    </div>
    <div class="maps-marker">
      <img src="../../../../../../assets/map-pin.svg" alt="map-marker">
    </div>
    <div #googleMap class="map" style="width: 100%;height: 300px;"></div>
    <div style="display:none">
      <div class="controls zoom-control">
        <button (click)="zoomMap('in')" class="zoom-control-in" title="Zoom In">+</button>
        <button (click)="zoomMap('out')" class="zoom-control-out" title="Zoom Out">−</button>
      </div>
    </div>
  `,
  styleUrls: ['./checkout-address-map.component.scss']
})
export class CheckoutAddressMapComponent implements OnInit {
  private static LOCATION_NOT_MATCH_ADDRESS = 'Lokasi yang Anda tandai tidak sesuai dengan alamat yang diisi';

  @ViewChild('googleMap') gmapElement: any;
  @ViewChild('mapsInput') mapsInput: HTMLInputElement;

  @Input() parent: FormGroup;
  @Input() data: { address: Addresses; isUpdated: boolean };
  @Input()
  location: any = {
    zipcode: '',
    city: '',
    district: '',
    lat: null,
    lng: null
  };

  @Output() public latitude = new EventEmitter<any>();
  @Output() public longitude = new EventEmitter<any>();
  @Output() public status = new EventEmitter<any>();
  @Output() public infoMaps = new EventEmitter<any>();

  map: google.maps.Map;
  infoMap: string;
  loadMap: any;
  window: any = window;
  mapCenter: any;
  mapInfo: string;
  currentLatLng: string;

  kec = false;

  constructor(private areaService: AreaService) {
  }

  ngOnInit(): void {
    console.log('this.location', this.location);

    this.loadGoogleMapApi();
    this.loadMap = setTimeout(() => {
      if (typeof this.window.google === 'object' && typeof this.window.google.maps === 'object') {
        this.setMap();
      } else {
        this.status.emit('Gagal terhubung dengan Google Maps.');
      }
    }, 1000);
  }

  loadGoogleMapApi() {
    const googleMapScript = document.getElementById('google-map-script');
    if (!googleMapScript) {
      const newGoogleMapScript = document.createElement('script');
      newGoogleMapScript.setAttribute('id', 'google-map-script');
      newGoogleMapScript.setAttribute('src',
        'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyC-ct8PW5TS3qNEG1lY0Q09PEr7RDwoLIM');
      document.head.appendChild(newGoogleMapScript);
    }
  }

  setMap() {
    if (this.data.isUpdated) {
      this.mapCenter = new google.maps.LatLng(this.location.lat, this.location.lng);
    } else {
      this.mapCenter = new google.maps.LatLng(-6.209408, 106.802790);
    }

    const mapProp = {
      center: this.mapCenter,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
      document.querySelector('.zoom-control'));
    this.setLocation(this.location);

    this.map.addListener('dragend', () => {
      this.setCenterLocation();
    });

    this.map.addListener('zoom_changed', () => {
      this.setCenterLocation();
    });

    const searchBox = new google.maps.places.SearchBox(this.mapsInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('maps-search'));
    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(this.map.getBounds());
    });

    searchBox.addListener('places_changed', () => {
      const bounds = new google.maps.LatLngBounds();
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      if (!places[0].geometry) {
        return;
      }
      if (places[0].geometry.viewport) {
        bounds.union(places[0].geometry.viewport);
      } else {
        bounds.extend(places[0].geometry.location);
      }
      this.setLocation({lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng()});
      this.map.fitBounds(bounds);
    });
  }

  setCenterLocation() {
    const place = this.map.getCenter();
    this.setLocation({lat: place.lat(), lng: place.lng()});
  }

  isLatLngAvailable(location: any): boolean {
    return location.lat !== null && location.lng !== null;
  }

  setLocationParams(location: any): string {
    if (!this.isLatLngAvailable(location)) {
      return location.city.name + ',' + location.district.district + ',' + location.district.postalCode;
    }

    return location.lat + ',' + location.lng;
  }

  isIncludePostalCode(item: any): boolean {
    if (item.types.includes('administrative_area_level_3')) {
      this.kec = item.long_name.toLowerCase() === this.location.district.subDistrict.toLowerCase();
      return true;
    }

    return false;
  }

  setLocation(location: any) {
    const locationParams = this.setLocationParams(location);

    this.areaService.getLngLat(locationParams).subscribe((res: any) => {
      if (res.results.length === 0) {
        this.infoMap = '';
        return;
      }

      const geocodeData = res.results[0];

      this.infoMap = geocodeData.formatted_address;
      this.infoMaps.emit(this.infoMap);

      if (geocodeData.formatted_address.includes('Indonesia')) {
        geocodeData.address_components.some(item => this.isIncludePostalCode(item));
      } else {
        this.map.panTo(new google.maps.LatLng(location.lat, location.lng));
        this.status.emit(CheckoutAddressMapComponent.LOCATION_NOT_MATCH_ADDRESS);
      }

      if (this.kec) {
        if (!this.isLatLngAvailable(location)) {
          this.map.panTo(geocodeData.geometry.location);
          this.latitude.emit(geocodeData.geometry.location.lat);
          this.longitude.emit(geocodeData.geometry.location.lng);
        } else {
          this.map.panTo(new google.maps.LatLng(location.lat, location.lng));
          this.latitude.emit(location.lat);
          this.longitude.emit(location.lng);
        }
        this.status.emit('');
      } else {
        this.map.panTo(geocodeData.geometry.location);
        this.status.emit(CheckoutAddressMapComponent.LOCATION_NOT_MATCH_ADDRESS);
      }

    });
  }

  zoomMap(direction: any) {
    if (direction === 'in') {
      this.map.setZoom(this.map.getZoom() + 1);
    } else {
      this.map.setZoom(this.map.getZoom() - 1);
    }
    return false;
  }
}
