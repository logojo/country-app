export interface Country {
    cca2       : string;
    flag       : string;
    bandera    : string;
    name       : string;
    capital    : string;
    population : number;
}

export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic';