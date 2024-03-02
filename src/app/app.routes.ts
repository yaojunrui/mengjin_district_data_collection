import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HousingPageComponent } from './pages/housing_page/housing_page.component';
import { BuildingsPageComponent } from './pages/buildings-page/buildings-page.component';
import { BuildingPageComponent } from './pages/building-page/building-page.component';
import { PeoplePageComponent } from './pages/people-page/people-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'housings', component: HousingPageComponent },
    { path: 'buildings', component: BuildingsPageComponent },
    { path: 'building', component: BuildingPageComponent },
    { path: 'people', component: PeoplePageComponent },
    { path: '**', component: LoginComponent }
];
