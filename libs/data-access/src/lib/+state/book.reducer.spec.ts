import { Action } from '@ngrx/store';

import * as BookActions from './book.actions';
import { BookEntity } from './book.models';
import { State, initialState, reducer } from './book.reducer';

describe('Book Reducer', () => {
  const createBookEntity = (id: string, name = ''): BookEntity => ({
    id,
    name: name || `name-${id}`,
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
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
