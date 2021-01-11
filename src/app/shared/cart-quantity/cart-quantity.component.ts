import {Component, Input, OnInit} from '@angular/core';
import {LineItems} from '@app/models/cart';
import {EntityToSlugPipe} from '@app/shared/utils/entity-to-slug.pipe';
import {Router} from '@angular/router';
import {CartService} from '@app/services/cart.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteCartDialogComponent} from '@app/pages/cart/delete-cart-dialog';
import {GtagService} from '@app/library/gtagjs/gtag.service';
import {Action} from '@app/library/gtagjs/gtag-definitions';

@Component({
  selector: 'app-cart-quantity',
  templateUrl: './cart-quantity.component.html',
  styleUrls: ['./cart-quantity.component.scss']
})
export class CartQuantityComponent implements OnInit {
  @Input()
  line: LineItems;
  id: string;

  constructor(private pipe: EntityToSlugPipe,
              private service: CartService,
              private router: Router,
              private dialog: MatDialog,
              private gtag: GtagService) {
    // TODO: Refactor to Store Based
  }

  ngOnInit(): void {
    this.id = this.pipe.transform(this.line.href);
  }

  public get selectedQuantity(): number {
    return this.line.quantity;
  }

  public set selectedQuantity(value: number) {
    if (value <= 0) {
      this.line.quantity = 1;
    } else if (value !== this.selectedQuantity) {
      this.line.quantity = value;
    }
    this.service.updateCart(this.pipe.transform(this.line.href), this.line.quantity)
      .subscribe(res => this.router.navigateByUrl('/cart'));
  }

  decrease(itemId: string) {
    if (this.selectedQuantity === 1) {
      this.dialog.open(DeleteCartDialogComponent, {
        data: this.line,
        width: '464px',
        height: '363px'
      });
    } else {
      this.selectedQuantity--;
      this.service.updateCart(itemId, this.selectedQuantity).subscribe(res => {
        this.gtag.removeFromCart({
          items: [{
            id: this.line.href,
            name: this.line.product.name,
            brand: this.line.product?.brand?.name || '',
            quantity: 1,
            price: this.line.product?.unitPrice?.current || 0,
          }]
        } as Action)
        this.router.navigateByUrl('/cart');
      });
    }
  }

  increase(itemId: string) {
    this.selectedQuantity++;
    this.service.updateCart(itemId, this.selectedQuantity).subscribe(res => {
      this.gtag.addToCart({
        items: [{
          id: this.line.href,
          name: this.line.product.name,
          brand: this.line.product?.brand?.name || '',
          quantity: 1,
          price: this.line.product?.unitPrice?.current || 0,
        }]
      })
      this.router.navigateByUrl('/cart');
    });

  }

}
