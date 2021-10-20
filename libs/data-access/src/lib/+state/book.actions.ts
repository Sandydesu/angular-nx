import { createAction, props } from '@ngrx/store';
import { BookEntity } from './book.models';

export const init = createAction('[Book Page] Init');

export const loadBookSuccess = createAction(
  '[Book/API] Load Book Success',
  props<{ book: BookEntity[] }>()
);

export const loadBookFailure = createAction(
  '[Book/API] Load Book Failure',
  props<{ error: any }>()
);
