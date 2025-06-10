import type { CountryResponse } from "../interfaces/res-country.interface";
import type { Country } from '../interfaces/country.interface';

export class CountryMappers {

  static restCountryToCountry(country: CountryResponse): Country {
    return {
      cca2: country.cca2,
      flag: country.flag,
      bandera: country.flags.svg,
      name: country.translations['spa'].common,
      capital: country.capital?.join(', '),
      population: country.population,
    }
  }

  static restCountriesToCountries (contries: CountryResponse[]): Country[] {
    return contries.map( this.restCountryToCountry );
  }
    
}