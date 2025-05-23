import { Component, input } from '@angular/core';
import type { Country } from '../../interfaces/country.interface';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-table',
  imports: [ DecimalPipe ],
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent {
 countries = input.required<Country[]>();
}
