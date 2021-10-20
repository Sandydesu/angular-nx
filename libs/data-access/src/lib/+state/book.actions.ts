import { createAction, props } from '@ngrx/store';
import { BookEntity, CollectionEntity } from '@myorg/shared';

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

export const addItemTobuyNow = createAction(
  '[Book/API] Add Item To Buy Now',
  props<{ book: BookEntity }>()
);

export const addCartItemsTobuyNow = createAction(
  '[Book/API] Add Cart Items To Buy Now'
);

export const addToCollectionsInit = createAction(
  '[Book/API] Add To Collections',
  props<{ collection: CollectionEntity; isCart: boolean }>()
);

export const collectionsAddedSuccess = createAction(
  '[Book/API] Collections Added Successfully',
  props<{ collections: CollectionEntity[]; isCart: boolean }>()
);

export const loadCollection = createAction(
  '[Book/API] Load Collection'
);
