import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as BookActions from './book.actions';
import { BookEffects } from './book.effects';
import { BookFacade } from './book.facade';
import { BOOK_FEATURE_KEY, State, reducer } from './book.reducer';

import { BooksService } from '../services/books.service';
import { WebStorageService } from '../services/web-storage.service';

import { BookEntity } from '@myorg/shared';

interface TestSchema {
  book: State;
}

describe('BookFacade', () => {
  let facade: BookFacade;
  let store: Store<TestSchema>;
  const createBookEntity = (id: string): BookEntity => ({
    id,
    title: 'Angular',
    authors: ['A', 'B'],
    description: 'Something',
    publisher: 'AB',
    publishedDate: '22-10-2099',
    coverUrl: 'https://ilovemyworld.com/laugh.png',
  });

  const mockCollection = {
    name: 'me',
    email: 'me@me.com',
    phone: '0011001100',
    address: 'space',
    items: [createBookEntity('AAA')],
  };

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(BOOK_FEATURE_KEY, reducer),
          EffectsModule.forFeature([BookEffects]),
          HttpClientTestingModule,
        ],
        providers: [BookFacade, BooksService, WebStorageService],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(BookFacade);
    });

    it('allBook$ should return the loaded list; and loaded flag == true', async () => {
      facade.search('angular');

      store.dispatch(
        BookActions.loadBookSuccess({
          book: [createBookEntity('AAA'), createBookEntity('BBB')],
        })
      );

      const list = await readFirst(facade.allBook$);
      const isLoaded = await readFirst(facade.loaded$);
      const searchTerm = await readFirst(facade.searchTerm$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
      expect(searchTerm).toBe('angular');
    });

    it('selectedBook$ should return the selected book', async () => {
      store.dispatch(
        BookActions.loadBookSuccess({
          book: [createBookEntity('AAA'), createBookEntity('BBB')],
        })
      );
      facade.selectedBook('AAA');

      const selectedBook: any = await readFirst(facade.selectedBook$);

      expect(selectedBook.id).toBe('AAA');
    });

    it('addToCart should return the cartCount and cartlist', async () => {
      facade.addToCart(createBookEntity('AAA'));

      store.dispatch(
        BookActions.addToCart({
          items: [createBookEntity('AAA'), createBookEntity('BBB')],
        })
      );

      const catCount: any = await readFirst(facade.cartCount$);
      const catList: any = await readFirst(facade.cartList$);

      expect(catCount).toBe(2);
      expect(catList.length).toBe(2);
    });
    it('addToCart should return the cartCount and cartlist', async () => {
      facade.removeItemFromCart(createBookEntity('AAA'));

      store.dispatch(
        BookActions.addToCart({
          items: [createBookEntity('BBB')],
        })
      );

      const catCount: any = await readFirst(facade.cartCount$);
      const catList: any = await readFirst(facade.cartList$);

      expect(catCount).toBe(1);
      expect(catList.length).toBe(1);
    });

    it('loadCart should return the cartCount and cartlist', async () => {
      facade.loadCart();

      store.dispatch(
        BookActions.addToCart({
          items: [createBookEntity('BBB')],
        })
      );

      const catCount: any = await readFirst(facade.cartCount$);
      const catList: any = await readFirst(facade.cartList$);

      expect(catCount).toBe(1);
      expect(catList.length).toBe(1);
    });

    it('addItemTobuyNow should return the buynowItems', async () => {
      facade.addItemTobuyNow(createBookEntity('BBB'));

      const buynowList: any = await readFirst(facade.buynowList$);

      expect(buynowList.length).toBe(1);
    });

    it('addCartItemsToBuyNow should return the buynow items', async () => {
      store.dispatch(
        BookActions.addToCart({
          items: [createBookEntity('BBB')],
        })
      );
      facade.addCartItemsToBuyNow();

      const buynowList: any = await readFirst(facade.buynowList$);

      expect(buynowList.length).toBe(1);
    });

    it('addToCollection should return the collections', async () => {
      facade.addToCollection(mockCollection, true);

      store.dispatch(
        BookActions.collectionsAddedSuccess({
          collections: [mockCollection],
          isCart: false,
        })
      );

      const collectionCount: any = await readFirst(facade.collectionCount$);
      const collectionList: any = await readFirst(facade.collectionList$);

      expect(collectionList.length).toBe(1);
      expect(collectionCount).toBe(1);
    });

    it('loadCollections should return the collections', async () => {
      facade.loadCollections();

      store.dispatch(
        BookActions.collectionsAddedSuccess({
          collections: [mockCollection],
          isCart: false,
        })
      );

      const collectionCount: any = await readFirst(facade.collectionCount$);
      const collectionList: any = await readFirst(facade.collectionList$);

      expect(collectionList.length).toBe(1);
      expect(collectionCount).toBe(1);
    });
  });
});
