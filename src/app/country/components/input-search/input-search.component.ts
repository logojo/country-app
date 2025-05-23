import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-input-search',
  imports: [],
  templateUrl: './input-search.component.html',
  styles: ``
})
export class InputSearchComponent {
  placeholder =  input<string>('Buscar...');
  value =  output<string>();

}
