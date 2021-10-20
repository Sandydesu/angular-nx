import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as BookActions from './book.actions';
import * as BookFeature from './book.reducer';
import * as BookSelectors from './book.selectors';

@Injectable()
export class BookFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(BookSelectors.getBookLoaded));
  allBook$ = this.store.pipe(select(BookSelectors.getAllBook));
  selectedBook$ = this.store.pipe(select(BookSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(BookActions.init());
  }
}
