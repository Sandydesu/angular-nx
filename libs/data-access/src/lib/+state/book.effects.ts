import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as BookActions from './book.actions';
import * as BookFeature from './book.reducer';

@Injectable()
export class BookEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return BookActions.loadBookSuccess({ book: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return BookActions.loadBookFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
