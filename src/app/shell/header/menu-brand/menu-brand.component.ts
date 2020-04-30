import {Component, OnInit} from '@angular/core';
import {BrandService} from "@app/services/brand.service";
import {map} from "rxjs/operators";
import {Brand} from "@app/models/brand";

@Component({
  selector: 'app-menu-brand',
  templateUrl: './menu-brand.component.html',
  styleUrls: ['./menu-brand.component.scss']
})
export class MenuBrandComponent implements OnInit {
  brand: Array<Brand> = [];

  constructor(private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.getHomeBrand();
  }

  getHomeBrand() {
     this.brandService.getHomeBrand().subscribe(data => {
     this.brand = data.body;
    });
  }

}
