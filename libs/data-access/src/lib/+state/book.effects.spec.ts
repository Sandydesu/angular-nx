import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule } from '@nrwl/angular';

import { ReplaySubject } from 'rxjs';

import * as BookActions from './book.actions';
import { BookEffects } from './book.effects';

import { BooksService } from '../services/books.service';
import { WebStorageService } from '../services/web-storage.service';

import { BOOK_URL } from '../constants/api.constants';

describe('BookEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: BookEffects;
  let httpMock: HttpTestingController;
  const mockBook = {
    id: '1ab',
    title: 'Angular',
    authors: ['A', 'B'],
    description: 'Something',
    publisher: 'AB',
    publishedDate: '22-10-2099',
    coverUrl: 'https://ilovemyworld.com/laugh.png',
  };

  const mockCollection = {
    name: 'me',
    email: 'me@me.com',
    phone: '0011001100',
    address: 'space',
    items: [mockBook],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), HttpClientTestingModule],
      providers: [
        BookEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        BooksService,
        WebStorageService,
      ],
    });

    effects = TestBed.inject(BookEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Book effects', () => {
    describe('Books', () => {
      it('should work init$', (done) => {
        actions = new ReplaySubject();
        actions.next(BookActions.init({ searchTerm: 'angular' }));

        effects.init$.subscribe((action) => {
          expect(action).toEqual(BookActions.loadBookSuccess({ book: [] }));
          done();
        });

        httpMock.expectOne(`${BOOK_URL}?q=angular`).flush([]);
      });

      it('should throw error init$', (done) => {
        const error: ErrorEvent = new ErrorEvent('error');
        actions = new ReplaySubject();
        actions.next(BookActions.init({ searchTerm: 'angular' }));

        effects.init$.subscribe((action) => {
          expect(action).toEqual(
            BookActions.loadBookFailure({
              error:
                'Http failure response for https://www.googleapis.com/books/v1/volumes?q=angular: 0 ',
            })
          );
          done();
        });

        httpMock.expectOne(`${BOOK_URL}?q=angular`).error(error);
      });
    });

    describe('Cart', () => {
      it('should work cartInit$', (done) => {
        actions = new ReplaySubject();
        actions.next(BookActions.addToCartInit({ book: mockBook }));

        effects.cartInit$.subscribe((action) => {
          expect(action).toEqual(BookActions.addToCart({ items: [mockBook] }));
          done();
        });
      });

      it('should work cartLoad$', (done) => {
        actions = new ReplaySubject();
        actions.next(BookActions.loadCart());

        effects.cartLoad$.subscribe((action) => {
          expect(action).toEqual(BookActions.addToCart({ items: [mockBook] }));
          done();
        });
      });

      it('should work removeFromCart$', (done) => {
        actions = new ReplaySubject();
        actions.next(BookActions.removeFromCart({ book: mockBook }));

        effects.removeFromCart$.subscribe((action) => {
          expect(action).toEqual(BookActions.addToCart({ items: [] }));
          done();
        });
      });
    });

    describe('Collections', () => {
      it('should work addItemsToCollection$', (done) => {
        actions = new ReplaySubject();
        actions.next(
          BookActions.addToCollectionsInit({
            collection: mockCollection,
            isCart: true,
          })
        );

        effects.addItemsToCollection$.subscribe((action) => {
          expect(action).toEqual(
            BookActions.collectionsAddedSuccess({
              collections: [mockCollection],
              isCart: true,
            })
          );
          done();
        });
      });

      it('should work collectionLoad$', (done) => {
        actions = new ReplaySubject();
        actions.next(BookActions.loadCollection());

        effects.collectionLoad$.subscribe((action) => {
          expect(action).toEqual(
            BookActions.collectionsAddedSuccess({
              collections: [mockCollection],
              isCart: false,
            })
          );
          done();
        });
      });
    });
  });
});
