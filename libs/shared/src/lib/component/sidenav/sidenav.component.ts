import { Component, Input } from '@angular/core';

@Component({
  selector: 'myorg-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() cartCount: number | any = 0;
  @Input() collectionCount: number | any = 0;
}
