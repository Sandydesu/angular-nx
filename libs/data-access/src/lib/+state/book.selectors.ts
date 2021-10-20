import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BOOK_FEATURE_KEY, State, bookAdapter } from './book.reducer';

// Lookup the 'Book' feature state managed by NgRx
export const getBookState = createFeatureSelector<State>(BOOK_FEATURE_KEY);

const { selectAll, selectEntities } = bookAdapter.getSelectors();

export const getBookLoaded = createSelector(
  getBookState,
  (state: State) => state.loaded
);

export const getBookError = createSelector(
  getBookState,
  (state: State) => state.error
);

export const getAllBook = createSelector(getBookState, (state: State) =>
  selectAll(state)
);

export const getBookEntities = createSelector(getBookState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getBookState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getBookEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getSearchTerm = createSelector(
  getBookState,
  (state: State) => state.searchTerm
);

export const getCartList = createSelector(
  getBookState,
  (state: State) => state.cartItems
);

export const getCartCount = createSelector(
  getBookState,
  (state: State) => state.cartItems?.length || 0
);

export const getBuyNowList = createSelector(
  getBookState,
  (state: State) => state.buyNowItems
);

export const isCart = createSelector(
  getBookState,
  (state: State) => state.isCart
);
