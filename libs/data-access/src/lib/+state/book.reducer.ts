import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as BookActions from './book.actions';
import { BookEntity } from './book.models';

export const BOOK_FEATURE_KEY = 'book';

export interface State extends EntityState<BookEntity> {
  selectedId?: string | number; // which Book record has been selected
  loaded: boolean; // has the Book list been loaded
  error?: string | null; // last known error (if any)
}

export interface BookPartialState {
  readonly [BOOK_FEATURE_KEY]: State;
}

export const bookAdapter: EntityAdapter<BookEntity> =
  createEntityAdapter<BookEntity>();

export const initialState: State = bookAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const bookReducer = createReducer(
  initialState,
  on(BookActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(BookActions.loadBookSuccess, (state, { book }) =>
    bookAdapter.setAll(book, { ...state, loaded: true })
  ),
  on(BookActions.loadBookFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return bookReducer(state, action);
}
