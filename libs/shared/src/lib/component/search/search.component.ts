import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'myorg-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchTerm = '';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
}
