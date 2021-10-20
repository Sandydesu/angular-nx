import { Component, OnInit } from '@angular/core';

import { BookFacade } from '@myorg/data-access';

@Component({
  selector: 'myorg-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
})
export class FeatureComponent implements OnInit {
  cartCount$ = this.bookFacade.cartCount$;
  collectionCount$ = this.bookFacade.collectionCount$;

  constructor(private bookFacade: BookFacade) {}

  ngOnInit() {
    this.bookFacade.loadCart();
    this.bookFacade.loadCollections();
  }
}
