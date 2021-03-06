import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as BookActions from './book.actions';

import { BookEntity, CollectionEntity } from '@myorg/shared';

export const BOOK_FEATURE_KEY = 'book';

export interface State extends EntityState<BookEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
  searchTerm?: string;
  cartItems?: BookEntity[];
  buyNowItems?: BookEntity[];
  collections?: CollectionEntity[];
  isCart?: boolean;
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
  on(BookActions.addItemTobuyNow, (state, { book }) => {
    const items = state.buyNowItems ? [...state.buyNowItems] : [];
    items.push(book);
    return {
      ...state,
      buyNowItems: items,
      isCart: false,
    };
  }),
  on(BookActions.addCartItemsTobuyNow, (state) => ({
    ...state,
    buyNowItems: state.cartItems,
    isCart: true,
  })),
  on(BookActions.collectionsAddedSuccess, (state, { collections, isCart }) => {
    let cartItems = state.cartItems ? [...state.cartItems] : [];
    if (isCart) {
      cartItems = [];
    }
    return {
      ...state,
      cartItems: cartItems,
      buyNowItems: [],
      collections: collections,
      isCart: false,
    };
  }),
  on(BookActions.loadBookFailure, (state, { error }) => ({
    ...state,
    error,
    loaded: true,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return bookReducer(state, action);
}
