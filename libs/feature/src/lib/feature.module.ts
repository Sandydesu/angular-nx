import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DataAccessModule } from '@myorg/data-access';
import { SharedModule } from '@myorg/shared';

import { FeatureComponent } from './feature.component';
import { BooksListComponent } from './components/books-list/books-list.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: BooksListComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    DataAccessModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
    SharedModule,
  ],
  declarations: [FeatureComponent, BooksListComponent],
  exports: [FeatureComponent],
})
export class FeatureModule {}
