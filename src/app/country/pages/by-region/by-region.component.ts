import { Component, inject, linkedSignal, signal } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import type { Region } from '../../interfaces/country.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParams( queryParam : string) : Region {
   queryParam = queryParam.toLocaleLowerCase();
   
   const validRegions : Record<string, Region> = {
    'africa'   : 'Africa',
    'americas' : 'Americas',
    'asia'     : 'Asia',
    'europe'   : 'Europe',
    'oceania'  : 'Oceania',
    'antarctic': 'Antarctic',
   }

   return validRegions[queryParam] ?? 'Americas'
}

@Component({
  selector: 'app-by-region',
  imports: [CommonModule, TableComponent],
  templateUrl: './by-region.component.html',
})
export default class ByRegionComponent {
 private countryService = inject( CountryService );
 private activetedRoute = inject ( ActivatedRoute );
 private router = inject ( Router );

public queryParam = this.activetedRoute.snapshot.queryParamMap.get('query') ?? '';

 public region = linkedSignal(() => validateQueryParams(this.queryParam));

 public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countriesResponse = rxResource({
    request: () => ({region: this.region()}),
    loader: ({ request }) => {
      if( !this.region() ) return of([]);
       this.router.navigate(['/country/by-region'] , {
        queryParams: {
          query: request.region
        }
      })
      return this.countryService.searchByRegion(request.region)
    }
  });
}
