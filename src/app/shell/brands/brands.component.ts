import {Component, OnInit} from '@angular/core';
import {BrandService} from "@app/services/brand.service";

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.getHomeBrand();
  }

  getHomeBrand() {
    this.brandService.getHomeBrand().subscribe(res => {
      console.log('res-brands', res.body);
    })
  }

}
