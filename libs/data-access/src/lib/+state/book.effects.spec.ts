import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as BookActions from './book.actions';
import { BookEffects } from './book.effects';

describe('BookEffects', () => {
  let actions: Observable<Action>;
  let effects: BookEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        BookEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(BookEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: BookActions.init() });

      const expected = hot('-a-|', {
        a: BookActions.loadBookSuccess({ book: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
