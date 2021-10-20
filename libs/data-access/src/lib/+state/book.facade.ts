import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as BookActions from './book.actions';

import * as BookSelectors from './book.selectors';

@Injectable()
export class BookFacade {
  loaded$ = this.store.pipe(select(BookSelectors.getBookLoaded));
  allBook$ = this.store.pipe(select(BookSelectors.getAllBook));
  selectedBook$ = this.store.pipe(select(BookSelectors.getSelected));

  constructor(private readonly store: Store) {}

  search(searchTerm: string) {
    this.store.dispatch(BookActions.init({ searchTerm }));
  }
}
