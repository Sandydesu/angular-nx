import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BookFacade } from '@myorg/data-access';

import { BookEntity } from '@myorg/shared';
@Component({
  selector: 'myorg-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent {
  books$ = this.bookFacade.allBook$;
  loaded$ = this.bookFacade.loaded$;
  searchTerm$ = this.bookFacade.searchTerm$;
  constructor(private bookFacade: BookFacade, private router: Router) {}

  search(searchTerm: string): void {
    this.bookFacade.search(searchTerm);
  }

  trackById(index: number, book: BookEntity): string {
    return book.id;
  }

  selectedBook(bookId: string) {
    this.bookFacade.selectedBook(bookId);
    this.router.navigate(['/books', bookId]);
  }
}
