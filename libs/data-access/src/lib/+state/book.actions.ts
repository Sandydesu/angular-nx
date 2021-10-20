import { createAction, props } from '@ngrx/store';
import { BookEntity } from '@myorg/shared';

export const init = createAction(
  '[Book Page] Init',
  props<{ searchTerm: string }>()
);

export const loadBookSuccess = createAction(
  '[Book/API] Load Book Success',
  props<{ book: BookEntity[] }>()
);

export const loadBookFailure = createAction(
  '[Book/API] Load Book Failure',
  props<{ error: string }>()
);
