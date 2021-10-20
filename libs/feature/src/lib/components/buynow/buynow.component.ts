import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BookEntity, REGEX } from '@myorg/shared';
import { BookFacade } from '@myorg/data-access';

@Component({
  selector: 'myorg-buynow',
  templateUrl: './buynow.component.html',
  styleUrls: ['./buynow.component.scss'],
})
export class BuynowComponent implements OnInit, OnDestroy {
  books: BookEntity[] | any = [];
  isCart: boolean | any = false;

  buyNowForm = this.fb.group({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX.Name),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(14),
      Validators.pattern(REGEX.Phone),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX.Email),
    ]),
    address: new FormControl('', [Validators.required]),
  });

  unSubscribe$ = new Subject();

  constructor(
    private router: Router,
    private bookFacade: BookFacade,
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnInit() {
    this.bookFacade.buynowList$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((buyNowList) => {
        this.books = buyNowList;
        if (!buyNowList) {
          this.router.navigate(['/book']);
        }
      });
    this.bookFacade.isCart$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((isCart) => (this.isCart = isCart));
  }

  back() {
    this.location.back();
  }

  trackById(index: number, book: BookEntity): string {
    return book.id;
  }

  buyNow() {
    const personInformation = this.buyNowForm.value;
    const collection = {
      ...personInformation,
      items: this.books,
    };
    this.bookFacade.addToCollection(collection, this.isCart);
    // this.router.navigate([COLLECTIONS]);
  }

  ngOnDestroy() {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
