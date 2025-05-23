import { Component, inject, resource, signal } from '@angular/core';
import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableComponent } from "../../components/table/table.component";
import { firstValueFrom } from 'rxjs';
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

  //* resource solo esta disponible a partir de Angular 19
  countriesResource = resource({
    request: () => ({query: this.query()}),
    loader: async({ request }) => {
    
      if( !this.query() ) return [];

      return await firstValueFrom( this.countryService.searchByCapital(request.query) )
    },
  });
}
