import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {UserPageComponent} from './user-page/user-page.component';
import {FilmPageComponent} from './film-page/film-page.component';
import {CatalogPageComponent} from './catalog-page/catalog-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AuthorizationPageComponent } from './authorization-page/authorization-page.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'film', component: FilmPageComponent},
  {path: 'film/:id', component: FilmPageComponent},
  {path: 'user/:id', component: UserPageComponent},
  {path: 'catalog', component: CatalogPageComponent},
  {path: 'registration', component: RegistrationPageComponent },
  {path: 'authorization', component: AuthorizationPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
