import { Component } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import type { Region } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region',
  imports: [TableComponent],
  templateUrl: './by-region.component.html',
})
export default class ByRegionComponent {
 public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];
}
