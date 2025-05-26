import { Component, inject,  signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableComponent } from "../../components/table/table.component";

import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country',
  imports: [InputSearchComponent, TableComponent],
  templateUrl: './by-country.component.html',
  styles: ``
})
export default class ByCountryComponent {
  private countryService = inject( CountryService );
 query = signal<string>('');


  countriesResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({ request }) => {    
      if( !this.query() ) return of([]);
      return  this.countryService.searchByCountry(request.query);
    },
  });
}
