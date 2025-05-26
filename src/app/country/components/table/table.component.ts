import { Component, input } from '@angular/core';
import type { Country } from '../../interfaces/country.interface';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-table',
  imports: [ RouterLink, DecimalPipe ],
  templateUrl: './table.component.html',
})
export class TableComponent {
 countries = input.required<Country[]>();
 errorMessage = input<string|unknown>();
 isLoading = input<boolean>(false);
 isEmpty = input<boolean>(false);
}
