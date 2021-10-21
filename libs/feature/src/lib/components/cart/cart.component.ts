import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BookFacade } from '@myorg/data-access';

import { BookEntity } from '@myorg/shared';

@Component({
  selector: 'myorg-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartList$ = this.bookFacade.cartList$;
  
  constructor(
    private bookFacade: BookFacade,
    private location: Location,
    private router: Router
  ) {}

  trackById(index: number, book: BookEntity): string {
    return book.id;
  }

  back() {
    this.location.back();
  }

  buyNow() {
    this.bookFacade.addCartItemsToBuyNow();
    this.router.navigate(['/buyNow']);
  }

  remove(book: BookEntity) {
    this.bookFacade.removeItemFromCart(book);
  }
}
