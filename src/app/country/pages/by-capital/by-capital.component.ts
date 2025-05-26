import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';

import { CountryService } from '../../services/country.service';
import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableComponent } from "../../components/table/table.component";

import type { Country } from '../../interfaces/country.interface';




@Component({
  selector: 'app-by-capital',
  imports: [InputSearchComponent, TableComponent],
  templateUrl: './by-capital.component.html',
})
export default class ByCapitalComponent {
  private countryService = inject( CountryService );
  query = signal<string>('');

    //* resource trabaja con observables
  countriesResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({ request }) => {
    
      if( !this.query() ) return of([]);

      return   this.countryService.searchByCapital( request.query );
    },
  });

  //* resource solo esta disponible a partir de Angular 19
  //* resource trabaja con promesas
  // countriesResource = resource({
  //   request: () => ({query: this.query()}),
  //   loader: async({ request }) => {
    
  //     if( !this.query() ) return [];

  //     return await firstValueFrom( this.countryService.searchByCapital(request.query) )
  //   },
  // });

  // isLoading = signal(false);
  // hasError = signal<string|null>(null);
  // countries = signal<Country[]>([]);
  
  // onSearch( query : string )  {
  //   if(!query) return;

  //   if( this.isLoading() ) return;

  //   this.isLoading.set(true);
  //   this.hasError.set(null);

  //   this.countryService.searchByCapital(query).subscribe({
  //     next: ( countries ) => {
  //       this.countries.set(countries);
  //       this.isLoading.set(false);
  //     },
  //     error: ( err ) => {
  //       console.log(err);
        
  //       this.hasError.set(err);
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //     }
  //   });
  // }
}
