import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'myorg-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() searchTerm: string | any = '';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
}
