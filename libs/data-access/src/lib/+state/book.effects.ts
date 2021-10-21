import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { BooksService } from '../services/books.service';
import { WebStorageService } from '../services/web-storage.service';

import * as BookActions from './book.actions';

import { BookEntity } from '@myorg/shared';

@Injectable()
export class BookEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.init),
      switchMap(({ searchTerm }) =>
        this.booksService.getBooksByName(searchTerm).pipe(
          map((books) => BookActions.loadBookSuccess({ book: books })),
          catchError((error) => {
            return of(BookActions.loadBookFailure({ error: error.message }));
          })
        )
      )
    )
  );

  cartInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.addToCartInit),
      switchMap(({ book }) => {
        const cartDetails = this.webStorageService.getItem('cartItems');
        const cartList = cartDetails ? JSON.parse(cartDetails) : [];
        cartList.push(book);
        this.webStorageService.setItem('cartItems', JSON.stringify(cartList));
        return of(BookActions.addToCart({ items: cartList }));
      })
    )
  );

  cartLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.loadCart),
      switchMap(() => {
        const cartDetails = this.webStorageService.getItem('cartItems');
        const cartList = cartDetails ? JSON.parse(cartDetails) : [];
        return of(BookActions.addToCart({ items: cartList }));
      })
    )
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.removeFromCart),
      switchMap(({ book }) => {
        const cartDetails = this.webStorageService.getItem('cartItems');
        const cartList = cartDetails ? JSON.parse(cartDetails) : [];
        const index = cartList.findIndex(
          (item: BookEntity) => item.id === book.id
        );
        cartList.splice(index, 1);
        this.webStorageService.setItem('cartItems', JSON.stringify(cartList));
        return of(BookActions.addToCart({ items: cartList }));
      })
    )
  );

  addItemsToCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.addToCollectionsInit),
      switchMap(({ collection, isCart }) => {
        /**
         * Collectons part
         */
        const collectionsDetails =
          this.webStorageService.getItem('collections');
        const collectionList = collectionsDetails
          ? JSON.parse(collectionsDetails)
          : [];
        collectionList.push(collection);
        this.webStorageService.setItem(
          'collections',
          JSON.stringify(collectionList)
        );

        /**
         * Based on condition remove cart items
         */
        if (isCart) {
          this.webStorageService.setItem('cartItems', JSON.stringify([]));
        }
        return of(
          BookActions.collectionsAddedSuccess({
            collections: collectionList,
            isCart: isCart,
          })
        );
      })
    )
  );

  collectionLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.loadCollection),
      switchMap(() => {
        const collectionDetails = this.webStorageService.getItem('collections');
        const collectionList = collectionDetails
          ? JSON.parse(collectionDetails)
          : [];
        return of(
          BookActions.collectionsAddedSuccess({
            collections: collectionList,
            isCart: false,
          })
        );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private booksService: BooksService,
    private webStorageService: WebStorageService
  ) {}
}
