import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BrandService} from '@app/services/brand.service';
import {Brand} from '@app/models/brand';
import {Logger} from '@app/core';

const log = new Logger('MenuBrandComponent');

@Component({
  selector: 'app-menu-brand',
  templateUrl: './menu-brand.component.html',
  styleUrls: ['./menu-brand.component.scss']
})
export class MenuBrandComponent implements OnInit {
  brands: Array<Brand> = [];
  @Output() listBrands = new EventEmitter<Brand[]>();
  @Output() clickEvent = new EventEmitter<any>();

  constructor(private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.getHomeBrand();
  }

  getHomeBrand() {
    log.debug('getHomeBrand');
    this.brandService.getHomeBrand(true).subscribe(data => {
      this.brands = data.body;
      this.listBrands.emit(data.body);
      // this.brands = this.brands.slice(0, 5);
      log.debug(this.brands);
    });
  }

  getDefaultImage(event: any) {
    event.target.src = '//via.placeholder.com/198';
  }

  setMode(brands: string) {
    log.debug(brands);
  }
}
