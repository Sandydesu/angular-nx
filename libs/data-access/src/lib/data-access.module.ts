import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthInterceptor } from './interceptors/auth.interceptor';

import { BooksService } from './services/books.service';
import { WebStorageService } from './services/web-storage.service';

import * as fromBook from './+state/book.reducer';
import { BookEffects } from './+state/book.effects';
import { BookFacade } from './+state/book.facade';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(fromBook.BOOK_FEATURE_KEY, fromBook.reducer),
    EffectsModule.forFeature([BookEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    BooksService,
    WebStorageService,
    BookFacade,
  ],
})
export class DataAccessModule {}
