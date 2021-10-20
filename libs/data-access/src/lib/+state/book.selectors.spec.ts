import { BookEntity } from './book.models';
import { bookAdapter, BookPartialState, initialState } from './book.reducer';
import * as BookSelectors from './book.selectors';

describe('Book Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBookId = (it: BookEntity) => it.id;
  const createBookEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BookEntity);

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
  });
});
