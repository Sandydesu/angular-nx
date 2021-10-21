import { Action } from '@ngrx/store';

import * as BookActions from './book.actions';
import { State, initialState, reducer } from './book.reducer';

import { BookEntity } from '@myorg/shared';

describe('Book Reducer', () => {
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

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('valid Book actions', () => {
    it('loadBookSuccess should return the list of known Book', () => {
      const book = [
        createBookEntity('PRODUCT-AAA'),
        createBookEntity('PRODUCT-zzz'),
      ];
      const action = BookActions.loadBookSuccess({ book });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });

    it('init should return searchTerm', () => {
      const action = BookActions.init({ searchTerm: 'AAA' });

      const result: State = reducer(initialState, action);

      expect(result.searchTerm).toBe('AAA');
    });

    it('selectedBook should return selectedBookId', () => {
      const action = BookActions.selectedBook({ bookId: 'AAA' });

      const result: State = reducer(initialState, action);

      expect(result.selectedId).toBe('AAA');
    });

    it('addToCart should return cartItems', () => {
      const action = BookActions.addToCart({
        items: [createBookEntity('PRODUCT-AAA')],
      });

      const result: State = reducer(initialState, action);

      expect(result.cartItems?.length).toBe(1);
    });

    it('addItemTobuyNow should return buyNowItems', () => {
      const action = BookActions.addItemTobuyNow({
        book: createBookEntity('PRODUCT-AAA'),
      });

      const result: State = reducer(
        { ...initialState, buyNowItems: [createBookEntity('PRODUCT-BBB')] },
        action
      );

      expect(result.buyNowItems?.length).toBe(2);
    });

    it('collectionsAddedSuccess should return buyNowItems', () => {
      const action = BookActions.collectionsAddedSuccess({
        collections: [mockCollection],
        isCart: true,
      });

      const result: State = reducer(initialState, action);

      expect(result.collections?.length).toBe(1);
    });
    it('loadBookFailure should return buyNowItems', () => {
      const action = BookActions.loadBookFailure({ error: 'Missing' });

      const result: State = reducer(initialState, action);

      expect(result.error).toBe('Missing');
    });
  });
});
