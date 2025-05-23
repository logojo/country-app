import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'country',
        loadChildren: () => import('./country/country.routes')
    },
    {
        path: '**',
        redirectTo: '',
    }
];
