import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BOOK_URL } from '../constants/api.constants';

@Injectable()
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooksByName(bookName: string) {
    const params = new HttpParams().set('q', bookName.trim());
    return this.http.get(BOOK_URL, { params });
  }
}
