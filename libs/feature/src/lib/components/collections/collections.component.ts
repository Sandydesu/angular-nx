import { Component, OnInit } from '@angular/core';
import { BookFacade } from '@myorg/data-access';
import { BookEntity, CollectionEntity } from '@myorg/shared';

@Component({
  selector: 'myorg-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent {
  myCollections$ = this.bookFacade.collectionList$;

  constructor(private bookFacade: BookFacade) {}

  trackById(index: number, book: BookEntity): string {
    return book.id;
  }
  trackByEmail(index: number, collection: CollectionEntity): string {
    return collection.email;
  }
}
