import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AreaService } from "@app/services";

@Component({
  selector: "app-address-map",
  template: `
    <div class="google-map__wrapper">
      <google-map
        #googleMap
        width="100%"
        height="280px"
        [center]="center"
        [options]="options"
        (mapDrag)="onLoading()"
        (mapDragstart)="onLoading()"
        (mapDragend)="mapDragEnd()"
      ></google-map>

      <div class="google-map__marker"></div>
      <div class="google-map__marker-info">
        {{ mapInfo.length > 10 ? (mapInfo | slice: 0:25) + "..." : mapInfo }}
      </div>
    </div>
  `,
  styleUrls: ["./address-map.component.scss"],
})
export class AddressMapComponent implements OnInit {
  @ViewChild("googleMap", { static: false }) googleMap: google.maps.Map;
  @Input() parent: FormGroup;

  center: google.maps.LatLngLiteral = {
    lat: -6.214877,
    lng: 106.79392, // as default
  };
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoom: 16,
  };
  mapInfo: string;
  currentLatLng: string;

  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    this.onLoading();
    this.initialLocation();
  }

  mapDragEnd(): void {
    this.setCenter(this.googleMap.getCenter().lat(), this.googleMap.getCenter().lng());
    this.setLatLngFormControl(this.center.lat, this.center.lng);
    this.getCurrentAddress();
  }

  initialLocation(): void {
    if (this.parent.get("lat").valid && this.parent.get("lng").valid) {
      this.setCenter(this.parent.get("lat").value, this.parent.get("lng").value);
    } else {
      this.setLatLngFormControl(this.center.lat, this.center.lng);
    }
    this.getCurrentAddress();
  }

  getCurrentAddress(): void {
    // fetch address
    this.areaService.fetchPinLocation(this.getLatLng()).subscribe((res) => {
      this.mapInfo = res.results[0].formatted_address;
    });
  }

  setCenter(lat: number, lng: number) {
    // set center of map
    this.center = { lat, lng };
  }
  setLatLngFormControl(lat: number, lng: number): void {
    // set latitude and longitude of form control
    this.parent.get("lat").setValue(lat);
    this.parent.get("lng").setValue(lng);
  }
  getLatLng(): string {
    // get string lat and lng (result example: `12.7167123,1382.12312`)
    // used when fetch address
    return `${this.parent.get("lat").value},${this.parent.get("lng").value}`;
  }

  onLoading(): void {
    // show loading when initial process or when map is drag (change position)
    this.mapInfo = "Loading...";
  }
}
