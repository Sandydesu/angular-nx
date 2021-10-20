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

export const selectedBook = createAction(
  '[Book/API] Selected Book',
  props<{ bookId: string }>()
);

export const loadCart = createAction('[Book/API] Load Cart');

export const addToCartInit = createAction(
  '[Book/API] Add to Cart Init',
  props<{ book: BookEntity }>()
);

export const addToCart = createAction(
  '[Book/API] Add to Cart Success',
  props<{ items: BookEntity[] }>()
);

export const removeFromCart = createAction(
  '[Book/API] Remove From Cart ',
  props<{ book: BookEntity }>()
);

export const buyNow = createAction(
  '[Book/API] Buy now',
  props<{ book: BookEntity }>()
);
