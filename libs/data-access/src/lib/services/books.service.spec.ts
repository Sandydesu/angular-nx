import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BooksService } from './books.service';
import { BOOK_URL } from '../constants/api.constants';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  const book = {
    id: 'KSlKtAEACAAJ',
    volumeInfo: {
      title: 'Learning Angular - Second Edition',
      authors: ['Christoffer Noring', 'Pablo Deeleman'],
      publishedDate: '2017-12-08',
      publisher: '',
      imageLinks: {
        thumbnail:
          'http://books.google.com/books/content?id=KSlKtAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      },
    },
    searchInfo: {
      textSnippet:
        'By the end of this book, you will be able to scrape websites more efficiently with more accurate data, and how to package, deploy and operate .',
    },
  };

  const expectedBook = {
    id: book.id,
    title: book.volumeInfo?.title,
    authors: book.volumeInfo?.authors || [],
    description: book.searchInfo?.textSnippet,
    publisher: book.volumeInfo?.publisher,
    publishedDate: book.volumeInfo?.publishedDate
      ? new Date(book.volumeInfo?.publishedDate).toISOString()
      : undefined,
    coverUrl: book.volumeInfo?.imageLinks?.thumbnail,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService],
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return books', (done) => {
    service.getBooksByName('Angular').subscribe((books) => {
      expect(books).toEqual([expectedBook]);
      done();
    });
    httpMock.expectOne(`${BOOK_URL}?q=Angular`).flush({ items: [book] });
  });
});
