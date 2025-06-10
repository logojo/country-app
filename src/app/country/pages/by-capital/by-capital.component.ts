import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
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
  private activetedRoute = inject ( ActivatedRoute );
  private router = inject ( Router );

  queryParam = this.activetedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);
  

    //* rxResource trabaja con observables
  countriesResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({ request }) => {
      if( !this.query() ) return of([]);

      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query
        }
      }); //modificarndo la url basado en lo buscado en el input 

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
