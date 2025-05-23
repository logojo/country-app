import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import type { CountryResponse } from '../interfaces/res-country.interface';
import type { Country } from '../interfaces/country.interface';
import { CountryMappers } from '../mappers/country.mappers';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject( HttpClient );
  private baseUrl = environment.apiUrl;

  searchByCapital( query: string ) : Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<CountryResponse[]>(`${this.baseUrl}/capital/${query}`)
               .pipe(
                map((res) =>  CountryMappers.restCountriesToCountries(res)),
                catchError((err) => {
                  console.log(err);
                  return throwError(() => new Error(`No se pudieron encontrar resultados con: ${ query } `));
                  
                }
              )
               );
  }

  searchByCountry( query: string ) : Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<CountryResponse[]>(`${this.baseUrl}/name/${query}`)
               .pipe(
                map((res) =>  CountryMappers.restCountriesToCountries(res)),
                catchError((err) => {
                  console.log(err);
                  return throwError(() => new Error(`No se pudieron encontrar resultados con: ${ query } `));
                  
                }
              )
               );
  }

}
