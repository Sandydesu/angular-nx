import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { BooksService } from '../services/books.service';

import * as BookActions from './book.actions';

@Injectable()
export class BookEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.init),
      switchMap(({ searchTerm }) =>
        this.booksService.getBooksByName(searchTerm).pipe(
          map((books) => BookActions.loadBookSuccess({ book: books })),
          catchError((error) =>
            of(BookActions.loadBookFailure({ error: error['error'].message }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private booksService: BooksService
  ) {}
}
