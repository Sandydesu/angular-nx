import { Injectable } from '@angular/core';
import { BookEntity } from '@myorg/shared';
import { select, Store } from '@ngrx/store';

import * as BookActions from './book.actions';

import * as BookSelectors from './book.selectors';

@Injectable()
export class BookFacade {
  loaded$ = this.store.pipe(select(BookSelectors.getBookLoaded));
  allBook$ = this.store.pipe(select(BookSelectors.getAllBook));
  selectedBook$ = this.store.pipe(select(BookSelectors.getSelected));
  searchTerm$ = this.store.pipe(select(BookSelectors.getSearchTerm));
  cartCount$ = this.store.pipe(select(BookSelectors.getCartCount));
  cartList$ = this.store.pipe(select(BookSelectors.getCartList));

  constructor(private readonly store: Store) {}

  search(searchTerm: string) {
    this.store.dispatch(BookActions.init({ searchTerm }));
  }

  selectedBook(bookId: string) {
    this.store.dispatch(BookActions.selectedBook({ bookId }));
  }

  addToCart(book: BookEntity) {
    this.store.dispatch(BookActions.addToCartInit({ book }));
  }

  removeItemFromCart(book: BookEntity) {
    this.store.dispatch(BookActions.removeFromCart({ book }));
  }

  loadCart() {
    this.store.dispatch(BookActions.loadCart());
  }

  addItemTobuyNow(book: BookEntity) {
    this.store.dispatch(BookActions.addItemTobuyNow({ book }));
  }

  addCartItemsToBuyNow() {
    this.store.dispatch(BookActions.addCartItemsTobuyNow());
  }
}
