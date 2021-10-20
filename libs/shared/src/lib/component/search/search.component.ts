import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'myorg-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() searchTerm: any = '';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
}
