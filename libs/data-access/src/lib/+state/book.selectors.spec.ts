import { BookEntity, CollectionEntity } from '@myorg/shared';
import { bookAdapter, BookPartialState, initialState } from './book.reducer';
import * as BookSelectors from './book.selectors';

describe('Book Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBookId = (it: BookEntity) => it.id;
  const createBookEntity = (id: string): BookEntity => ({
    id,
    title: 'Angular',
    authors: ['A', 'B'],
    description: 'Something',
    publisher: 'AB',
    publishedDate: '22-10-2099',
    coverUrl: 'https://ilovemyworld.com/laugh.png',
  });

  const mockCollection = {
    name: 'me',
    email: 'me@me.com',
    phone: '0011001100',
    address: 'space',
    items: [createBookEntity('AAA')],
  };

  let state: BookPartialState;

  beforeEach(() => {
    state = {
      book: bookAdapter.setAll(
        [
          createBookEntity('PRODUCT-AAA'),
          createBookEntity('PRODUCT-BBB'),
          createBookEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
          searchTerm: 'me',
          cartItems: [createBookEntity('PRODUCT-AAA')],
          buyNowItems: [createBookEntity('PRODUCT-AAA')],
          collections: [mockCollection],
          isCart: false,
        }
      ),
    };
  });

  describe('Book Selectors', () => {
    it('getAllBook() should return the list of Book', () => {
      const results = BookSelectors.getAllBook(state);
      const selId = getBookId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = BookSelectors.getSelected(state) as BookEntity;
      const selId = getBookId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getBookLoaded() should return the current "loaded" status', () => {
      const result = BookSelectors.getBookLoaded(state);

      expect(result).toBe(true);
    });

    it('getBookError() should return the current "error" state', () => {
      const result = BookSelectors.getBookError(state);

      expect(result).toBe(ERROR_MSG);
    });

    it('getSearchTerm() should return the searchTerm', () => {
      const result = BookSelectors.getSearchTerm(state) as string;

      expect(result).toBe('me');
    });

    it('getCartList() should return the cartList', () => {
      const result = BookSelectors.getCartList(state) as BookEntity[];

      expect(result.length).toBe(1);
    });

    it('getCartCount() should return the cart count', () => {
      const result = BookSelectors.getCartCount(state) as number;

      expect(result).toBe(1);
    });

    it('getBuyNowList() should return the getBuyNowList', () => {
      const result = BookSelectors.getBuyNowList(state) as BookEntity[];

      expect(result.length).toBe(1);
    });

    it('isCart() should return the isCart', () => {
      const result = BookSelectors.isCart(state) as boolean;

      expect(result).toBe(false);
    });

    it('collectionCount() should return the collection count', () => {
      const result = BookSelectors.collectionCount(state) as number;

      expect(result).toBe(1);
    });

    it('collectionList() should return the collectionList', () => {
      const result = BookSelectors.collectionList(state) as CollectionEntity[];

      expect(result.length).toBe(1);
    });
  });
});
