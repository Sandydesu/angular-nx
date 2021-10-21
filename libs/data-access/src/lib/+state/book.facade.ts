import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as BookActions from './book.actions';

import * as BookSelectors from './book.selectors';

import { BookEntity, CollectionEntity } from '@myorg/shared';

@Injectable()
export class BookFacade {
  loaded$ = this.store.pipe(select(BookSelectors.getBookLoaded));
  allBook$ = this.store.pipe(select(BookSelectors.getAllBook));
  selectedBook$ = this.store.pipe(select(BookSelectors.getSelected));
  searchTerm$ = this.store.pipe(select(BookSelectors.getSearchTerm));
  cartCount$ = this.store.pipe(select(BookSelectors.getCartCount));
  cartList$ = this.store.pipe(select(BookSelectors.getCartList));
  buynowList$ = this.store.pipe(select(BookSelectors.getBuyNowList));
  isCart$ = this.store.pipe(select(BookSelectors.isCart));
  collectionCount$ = this.store.pipe(select(BookSelectors.collectionCount));
  collectionList$ = this.store.pipe(select(BookSelectors.collectionList));
  error$ = this.store.pipe(select(BookSelectors.getBookError));

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

  addToCollection(collection: CollectionEntity, isCart: boolean) {
    this.store.dispatch(
      BookActions.addToCollectionsInit({ collection, isCart })
    );
  }

  loadCollections() {
    this.store.dispatch(BookActions.loadCollection());
  }
}
