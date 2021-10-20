import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DataAccessModule } from '@myorg/data-access';
import { SharedModule } from '@myorg/shared';

import { FeatureComponent } from './feature.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CartComponent } from './components/cart/cart.component';
import { BuynowComponent } from './components/buynow/buynow.component';
import { CollectionsComponent } from './components/collections/collections.component';

const routes: Route[] = [
  {
    path: 'books',
    pathMatch: 'full',
    component: BooksListComponent,
  },
  {
    path: 'books/:book_id',
    component: BookDetailsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'buyNow',
    component: BuynowComponent,
  },
  {
    path: 'collections',
    component: CollectionsComponent,
  },
  { path: '**', redirectTo: 'books' },
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DataAccessModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  declarations: [
    FeatureComponent,
    BooksListComponent,
    BookDetailsComponent,
    CartComponent,
    BuynowComponent,
    CollectionsComponent,
  ],
  exports: [FeatureComponent],
})
export class FeatureModule {}
