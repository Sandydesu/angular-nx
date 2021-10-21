import { Component, Input } from '@angular/core';

import { BookEntity } from '../../models/book.models';

@Component({
  selector: 'myorg-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent {
  @Input() book: BookEntity | any = {
    id: '',
    title: '',
    authors: [''],
    description: '',
    publisher: '',
    publishedDate: '',
    coverUrl: '',
  };
  @Input() fullDetails = false;
}
