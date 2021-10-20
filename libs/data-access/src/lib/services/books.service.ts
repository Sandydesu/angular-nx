import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BOOK_URL } from '../constants/api.constants';
import { BookEntity } from '@myorg/shared';
import { map } from 'rxjs/operators';

@Injectable()
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooksByName(bookName: string) {
    const params = new HttpParams().set('q', bookName.trim());
    return this.http.get<BookEntity[]>(BOOK_URL, { params }).pipe(
      map((resp: any) => {
        if (resp && resp.items) {
          return resp.items.map((item: any) => {
            return {
              id: item.id,
              title: item.volumeInfo?.title,
              authors: item.volumeInfo?.authors || [],
              description: item.searchInfo?.textSnippet,
              publisher: item.volumeInfo?.publisher,
              publishedDate: item.volumeInfo?.publishedDate
                ? new Date(item.volumeInfo?.publishedDate).toISOString()
                : undefined,
              coverUrl: item.volumeInfo?.imageLinks?.thumbnail,
            };
          });
        }
        return [];
      })
    );
  }
}
