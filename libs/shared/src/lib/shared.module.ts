import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './component/book/book.component';
import { HeaderComponent } from './component/header/header.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { MorePipe } from './pipes/more.pipe';
import { PhonePipe } from './pipes/phone.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BookComponent,
    HeaderComponent,
    SidenavComponent,
    SpinnerComponent,
    MorePipe,
    PhonePipe
  ],
})
export class SharedModule {}
