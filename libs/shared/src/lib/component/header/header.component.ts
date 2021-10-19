import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'myorg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggleOnOff: EventEmitter<void> = new EventEmitter<void>();
}
