import { HttpClient } from '@angular/common/http';
import { inject, Injectable, } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';

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

  private queryCacheCapital = new Map<string, Country[]>();
  private queryCachePais = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital( query: string ) : Observable<Country[]> {
    query = query.toLowerCase();

    //* esto busca en el mapa si ya existe una llave con el query buscado
    //* esto evita que se realicen demaciadas peticiones por busquedas anteriores
    if( this.queryCacheCapital.has(query) ) {
        return of( this.queryCacheCapital.get(query) ?? [] );
    }
    
    return this.http.get<CountryResponse[]>(`${this.baseUrl}/capital/${query}`)
               .pipe(
                 map((res) =>  CountryMappers.restCountriesToCountries(res)),
                 tap(( countries => this.queryCacheCapital.set(query, countries) )),
                 catchError((err) => {
                  return throwError(() => new Error(`No se pudieron encontrar resultados con: ${ query } `));
                 }
              )
               );
  }

  searchByCountry( query: string ) : Observable<Country[]> {
    query = query.toLowerCase();

     if( this.queryCachePais.has(query) ) {
        return of( this.queryCachePais.get(query) ?? [] );
    }

    return this.http.get<CountryResponse[]>(`${this.baseUrl}/name/${query}`)
               .pipe(
               //delay(2000),
                map((res) =>  CountryMappers.restCountriesToCountries(res)),
                tap(( countries => this.queryCachePais.set(query, countries) )),
                catchError((err) => {
                  console.log(err);
                  return throwError(() => new Error(`No se pudieron encontrar resultados con: ${ query } `));
                  
                }
              )
               );
  }

  searchByAlphaCode( code: string ) {

    return this.http.get<CountryResponse[]>(`${this.baseUrl}/alpha/${code}`)
               .pipe(  
                 delay(2000),           
                map((res) =>  CountryMappers.restCountriesToCountries(res)),
                map( countries => countries.at(0)), //*regresando el primer elemento del array
                catchError((err) => {
                  return throwError(() => new Error(`No se pudieron encontrar resultados con: ${ code } `));
                  
                }
              )
               );
  }

  searchByRegion( region: string ) : Observable<Country[]> {

     if( this.queryCacheRegion.has(region) ) {
        return of( this.queryCacheRegion.get(region) ?? [] );
    }

    return this.http.get<CountryResponse[]>(`${this.baseUrl}/region/${region}`)
               .pipe(
               //delay(2000),
                map((res) =>  CountryMappers.restCountriesToCountries(res)),
                tap(( countries => this.queryCacheRegion.set(region, countries) )),
                catchError((err) => {
                  console.log(err);
                  return throwError(() => new Error(`No se pudieron encontrar resultados con: ${ region } `));
                  
                }
              )
               );
  }

}
