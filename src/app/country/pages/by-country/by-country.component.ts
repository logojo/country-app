import { Component, inject,  linkedSignal,  signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { InputSearchComponent } from "../../components/input-search/input-search.component";
import { TableComponent } from "../../components/table/table.component";

import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country',
  imports: [InputSearchComponent, TableComponent],
  templateUrl: './by-country.component.html',
  styles: ``
})
export default class ByCountryComponent {
  private countryService = inject( CountryService );
  private activatedRoute = inject( ActivatedRoute );
  private router = inject( Router );

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal<string>(() => this.queryParam);


  countriesResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({ request }) => {    
      if( !this.query() ) return of([]);

      this.router.navigate(['/country/by-country'] , {
        queryParams: {
          query: request.query
        }
      })
      return  this.countryService.searchByCountry(request.query);
    },
  });
}
