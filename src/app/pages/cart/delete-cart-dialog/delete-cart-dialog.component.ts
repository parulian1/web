import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LineItems} from '@app/models/cart';
import {EntityToSlugPipe} from '@app/shared/utils/entity-to-slug.pipe';
import {CartService} from '@app/services/cart.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GtagService} from '@app/library/gtagjs/gtag.service';
import {Action} from '@app/library/gtagjs/gtag-definitions';

@Component({
  selector: 'app-delete-cart-dialog',
  templateUrl: './delete-cart-dialog.component.html',
  styleUrls: ['./delete-cart-dialog.component.scss']
})
export class DeleteCartDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: LineItems,
              private pipe: EntityToSlugPipe,
              private service: CartService,
              private router: Router,
              private route: ActivatedRoute,
              private gtag: GtagService) {
  }

  ngOnInit(): void {
  }

  removeItem(href: string) {
    this.service.removeCartItem(this.pipe.transform(href)).subscribe(res => {
      if (res.status === 204) {
        // TODO: Move this to cart component
        this.gtag.removeFromCart({
          items: [{
            id: this.data.href,
            name: this.data.product.name,
            brand: this.data.product?.brand?.name || '',
            quantity: this.data.quantity,
            price: this.data.product?.unitPrice?.current || 0,
          }]
        } as Action)
        this.router.navigate(['/cart']);
      }
    });
  }
}
