import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BookComponent } from './component/book/book.component';
import { HeaderComponent } from './component/header/header.component';
import { SearchComponent } from './component/search/search.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { MorePipe } from './pipes/more.pipe';
import { PhonePipe } from './pipes/phone.pipe';

const EXPORTS = [
  BookComponent,
  HeaderComponent,
  SearchComponent,
  SidenavComponent,
  SpinnerComponent,
  MorePipe,
  PhonePipe,
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  declarations: EXPORTS,
  exports: EXPORTS,
})
export class SharedModule {}
