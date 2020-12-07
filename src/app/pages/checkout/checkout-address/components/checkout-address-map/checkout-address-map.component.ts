import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AreaService} from '@app/services';
import {Addresses} from "@app/models/addresses";

declare var google: any;

@Component({
  selector: 'app-checkout-address-map',
  template: `
    <div id="maps-search">
      <input id="maps-input" class="controls" type="text" placeholder="Cari lokasi">
      <i class="ion-ios-search-strong"></i>
    </div>
    <div class="maps-tooltip">
      <div class="info" [title]="infoMap">{{infoMap}}</div>
      <div class="arrow"></div>
    </div>
    <div class="maps-marker">
      <img src="../../../../../../assets/map-pin.svg">
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
  @ViewChild('googleMap') gmapElement: any;
  @Input() parent: FormGroup;
  @Output()
  public latitude = new EventEmitter<any>();
  @Output()
  public longitude = new EventEmitter<any>();
  @Output()
  public status = new EventEmitter<any>();
  @Output()
  public infoMaps = new EventEmitter<any>();
  map: google.maps.Map;
  @Input()
  location: any = {
    zipcode: '',
    city: '',
    district: '',
    lat: null,
    lng: null
  };
  @Input() data: { address: Addresses; isUpdated: boolean }

  infoMap: string;
  loadMap: any;
  window: any = window;
  mapCenter: any;
  mapInfo: string;
  currentLatLng: string;

  constructor(private areaService: AreaService) {
  }

  ngOnInit(): void {
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
    const googleMapSript = document.getElementById('google-map-script');
    if (!googleMapSript) {
      const newGoogleMapSript = document.createElement('script');
      newGoogleMapSript.setAttribute('id', 'google-map-script');
      newGoogleMapSript.setAttribute('src',
        'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyC-ct8PW5TS3qNEG1lY0Q09PEr7RDwoLIM');
      document.head.appendChild(newGoogleMapSript);
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
      const place = this.map.getCenter();
      const latitude = place.lat();
      const longitude = place.lng();
      this.setLocation({lat: latitude, lng: longitude});
    });

    this.map.addListener('zoom_changed', () => {
      const place = this.map.getCenter();
      const latitude = place.lat();
      const longitude = place.lng();
      this.setLocation({lat: latitude, lng: longitude});
    });

    const input = document.getElementById('maps-input');
    const mapsSearch = document.getElementById('maps-search');
    const searchBox = new google.maps.places.SearchBox(input);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(mapsSearch);
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

  setLocation(location: any) {
    let address;
    if (location.lat === null && location.lng === null) {
      address = location.city.name + ' ' + location.district.district + ' ' + location.district.postalCode;
    } else {
      address = location.lat + ',' + location.lng;
    }
    this.areaService.getLngLat(address).subscribe((res: any) => {
      if (res.results.length === 0) {
        this.infoMap = '';
        return;
      }
      const data = res.results[0];
      let kec = false;
      let zip = false;
      this.infoMap = data.formatted_address;
      if (data.formatted_address.includes('Indonesia')) {
        data.address_components.some(item => {
          if (item.types.includes('postal_code')) {
            if (item.short_name === this.location.zipcode) {
              zip = true;
            }
            return true;
          } else {
            if (item.types.includes('administrative_area_level_3')) {
              if (item.long_name.toLowerCase() === this.location.district.district.toLowerCase()) {
                kec = true;
              }
              return false;
            }
          }
        });
      } else {
        this.map.panTo(new google.maps.LatLng(location.lat, location.lng));
        this.status.emit('Lokasi yang Anda tandai tidak sesuai dengan alamat yang diisi');
      }
      if (kec || zip) {
        if (location.lat === null && location.lng === null) {
          this.map.panTo(data.geometry.location);
          this.latitude.emit(data.geometry.location.lat);
          this.longitude.emit(data.geometry.location.lng);
        } else {
          this.map.panTo(new google.maps.LatLng(location.lat, location.lng));
          this.latitude.emit(location.lat);
          this.longitude.emit(location.lng);
        }
        this.status.emit('');
      } else {
        this.map.panTo(data.geometry.location);
        this.status.emit('Lokasi yang Anda tandai tidak sesuai dengan alamat yang diisi');
      }
      this.infoMaps.emit(this.infoMap);
    }, err => {
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
