import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { BookFacade } from '@myorg/data-access';
import { BookEntity } from '@myorg/shared';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'myorg-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  book: BookEntity | any;

  unSubscribe$ = new Subject();
  constructor(private bookFacade: BookFacade, private location: Location) {}

  ngOnInit() {
    this.bookFacade.selectedBook$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((book) => {
        this.book = book;
      });
  }
  back() {
    this.location.back();
  }

  addToCart() {
    this.bookFacade.addToCart(this.book);
  }

  buyNow() {
    // this.bookFacade.addToBuyNow(this.book.id);
  }

  ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
