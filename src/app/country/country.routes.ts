import { Routes } from "@angular/router";
import CountryLayoutComponent from './layouts/country-layout/country-layout.component';
import ByCapitalComponent from './pages/by-capital/by-capital.component';

const countryRoutes: Routes = [
    {
        path: '',
        component: CountryLayoutComponent,
        children: [
            {
                path: 'by-capital',
                component: ByCapitalComponent,
            },
            {
                path: 'by-country',
               loadComponent: () => import('./pages/by-country/by-country.component')
            },
            {
                path: 'by-region',
               loadComponent: () => import('./pages/by-region/by-region.component')
            },
            {
                path: 'by/:code',
               loadComponent: () => import('./pages/country/country.component')
            },
            {
                path: '**',
                redirectTo: 'by-capital',
            }
        ]

    },   
];

export default countryRoutes;
