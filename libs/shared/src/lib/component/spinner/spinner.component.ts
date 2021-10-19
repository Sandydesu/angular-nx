import { Component } from '@angular/core';

@Component({
  selector: 'myorg-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  isLoading = true;
}
