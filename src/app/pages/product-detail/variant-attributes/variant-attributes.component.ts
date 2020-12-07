import {Component, Input, OnInit} from '@angular/core';
import {ProductAttributes, ProductDetail, ProductDetailVariants} from "@app/models/product-detail";
import {Logger} from "@app/core";

const log = new Logger('VariantAttribute');


@Component({
  selector: 'app-variant-attributes',
  templateUrl: './variant-attributes.component.html',
  styleUrls: ['./variant-attributes.component.scss']
})
export class VariantAttributesComponent implements OnInit {
  @Input() attributeDefinition: ProductAttributes;
  @Input() product: ProductDetail;
  @Input() currentUrl: string;

  possibleValues: Array<any>;

  constructor() {
  }

  ngOnInit(): void {
    const currentAttrHref = this.attributeDefinition.href;

    const candidateValues = this.product.variants.map(v => v.attributes[currentAttrHref]).filter(v => !!v);
    candidateValues.push(this.product.attributes[currentAttrHref]);
    this.possibleValues = Array.from(new Set(candidateValues));
    this.possibleValues.sort((a, b) => a - b);
    log.debug(this.possibleValues);
  }

  getLink(val: any) {
    const varian = this.fullVariantList.filter(
      m => m.attributes[this.attributeDefinition.href] === val && this.otherAttributesMatch(m));
    if (varian.length > 0) {
      return varian[0].href;
    }
  }

  get fullVariantList(): Array<any> {
    const listVariant = this.product.variants.map(v => v);
    // @ts-ignore
    listVariant.push(this.product);
    return listVariant;
  }

  otherAttributesMatch(variant: ProductDetailVariants): boolean {
    for (const [key, value] of Object.entries(variant.attributes)) {
      if (key === this.attributeDefinition.href) {
        continue;
      }

      if (this.product.attributes[key] !== value) {
        return false;
      }
    }

    return true;
  }
}
