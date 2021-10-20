import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as BookActions from './book.actions';
import { BookEntity } from '@myorg/shared';

export const BOOK_FEATURE_KEY = 'book';

export interface State extends EntityState<BookEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
  searchTerm?: string;
  cartItems?: BookEntity[];
  buyNowItems?: BookEntity[];
}

export interface BookPartialState {
  readonly [BOOK_FEATURE_KEY]: State;
}

export const bookAdapter: EntityAdapter<BookEntity> =
  createEntityAdapter<BookEntity>();

export const initialState: State = bookAdapter.getInitialState({
  loaded: true,
});

const bookReducer = createReducer(
  initialState,
  on(BookActions.init, (state, { searchTerm }) => ({
    ...state,
    loaded: false,
    error: null,
    searchTerm: searchTerm,
  })),
  on(BookActions.loadBookSuccess, (state, { book }) =>
    bookAdapter.setAll(book, { ...state, loaded: true })
  ),
  on(BookActions.selectedBook, (state, { bookId }) => ({
    ...state,
    selectedId: bookId,
  })),
  on(BookActions.addToCart, (state, { items }) => ({
    ...state,
    cartItems: items,
  })),
  on(BookActions.buyNow, (state, { book }) => {
    const items = state.buyNowItems || [];
    items.push(book);
    return {
      ...state,
      buyNowItems: items,
    };
  }),
  on(BookActions.loadBookFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return bookReducer(state, action);
}
