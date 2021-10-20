import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DataAccessModule } from '@myorg/data-access';
import { SharedModule } from '@myorg/shared';

import { FeatureComponent } from './feature.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

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
    MatSidenavModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [FeatureComponent, BooksListComponent, BookDetailsComponent],
  exports: [FeatureComponent],
})
export class FeatureModule {}
