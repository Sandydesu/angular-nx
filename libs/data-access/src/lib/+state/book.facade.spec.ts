import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as BookActions from './book.actions';
import { BookEffects } from './book.effects';
import { BookFacade } from './book.facade';
import { BookEntity } from './book.models';
import { BOOK_FEATURE_KEY, State, initialState, reducer } from './book.reducer';
import * as BookSelectors from './book.selectors';

interface TestSchema {
  book: State;
}

describe('BookFacade', () => {
  let facade: BookFacade;
  let store: Store<TestSchema>;
  const createBookEntity = (id: string, name = ''): BookEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(BOOK_FEATURE_KEY, reducer),
          EffectsModule.forFeature([BookEffects]),
        ],
        providers: [BookFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(BookFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allBook$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allBook$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadBookSuccess` to manually update list
     */
    it('allBook$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allBook$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        BookActions.loadBookSuccess({
          book: [createBookEntity('AAA'), createBookEntity('BBB')],
        })
      );

      list = await readFirst(facade.allBook$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
