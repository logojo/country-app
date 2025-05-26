import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "../../components/country-information/country-information.component";

@Component({
  selector: 'app-country',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country.component.html',
})
export default class CountryComponent {

  private countryService = inject(CountryService);
  code = inject( ActivatedRoute ).snapshot.params['code'];

  countryResource = rxResource({
    request: ()  => ({ code: this.code}),
    loader: ({request}) => this.countryService.searchByAlphaCode(request.code),
   });


}
