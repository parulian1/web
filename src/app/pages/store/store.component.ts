import {Component, Input, OnInit} from '@angular/core';
import {StoreService} from "@app/services/store.service";
import {StoreLocation} from "@app/models/store";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  public store: Array<StoreLocation> = [];
  public addresses: Array<string> = [];
  public storeList: Array<{ name: string, addr: string, code: string, state: string }> = [];
  public storeForm: FormGroup;

  currentState: string;

  constructor(private storeService: StoreService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    // this.getStoreLocation();
    // this.initStoreForm();
    //
    // this.activatedRoute.paramMap.subscribe(params => {
    //   this.currentState = params.get('current-state');
    //   console.log('params-route', this.currentState);
    //
    //   this.setContent(this.currentState);
    // })
  }

  getStoreLocation() {
    this.storeService.getStoreLocation().subscribe(res => {
      // this.store = res;
      for (let item of this.store) {
        this.addresses.push(item.address.state);
      }

      this.addresses = [...new Set(this.addresses)];
      this.addresses = this.addresses.sort();
    });
  }

  initStoreForm() {
    this.storeForm = new FormGroup({
      store: new FormControl('')
    })
  }

  setContent(currState: string){
    this.storeList = [];
    for (let item of this.store) {
      if (currState === item.address.state) {
        this.storeList.push({
          name: item.name,
          addr: item.address.street,
          code: item.code,
          state: item.address.state
        });
      }
    }
  }

}
