import { Component, Input } from '@angular/core';

@Component({
  selector: 'myorg-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() cartCount: any = 0;
  @Input() collectionCount: any = 0;
}
