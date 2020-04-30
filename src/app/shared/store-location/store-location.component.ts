import {Component, OnInit} from '@angular/core';
import {StoreService} from "@app/services/store.service";
import {StoreLocation} from "@app/models/store";

@Component({
  selector: 'app-store-location',
  templateUrl: './store-location.component.html',
  styleUrls: ['./store-location.component.scss']
})
export class StoreLocationComponent implements OnInit {
  public store: Array<StoreLocation> = [];
  public storeList: Array<{ name: string, state: string, lat: number, lng: number }> = [];
  public distance: Array<{ state: string, distance: number }> = [];

  currentLat: number;
  currentLng: number;

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    // this.getNearbyStore();
    navigator.geolocation.getCurrentPosition(position => {
      this.currentLat = position.coords.latitude;
      this.currentLng = position.coords.longitude;
    })
  }

  getNearbyStore() {
    this.storeService.getStoreLocation().subscribe(res => {
      // this.store = res;

      for (let item of this.store) {
        this.storeList.push({
          name: item.name,
          state: item.address.state,
          lat: Number(item.address.latitude),
          lng: Number(item.address.longitude)
        })
      }

      this.countStoreDistance(this.storeList);

      console.log(this.distance);

    });
  }

  countStoreDistance(store: Array<{ name: string, state: string, lat: number, lng: number }>) {
    let R = 6371.0710;
    let temp = 0;
    for (let index in store) {
      let rLat1 = this.currentLat * (Math.PI / 180);
      let rLat2 = store[index].lat * (Math.PI / 180);
      let diffLat = rLat2 - rLat1;
      let diffLon = (store[index].lng - this.currentLng) * (Math.PI / 180);

      let d = 2 * R * Math.asin(Math.sqrt(Math.sin(diffLat / 2) * Math.sin(diffLat / 2) + Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(diffLon / 2) * Math.sin(diffLon / 2)));

      if(temp == 0){
        temp = d
      } else if (d < temp){
        temp = d
        this.distance.push({
          state:store[index].state,
          distance: d
        });
      }


    }
  }


}
