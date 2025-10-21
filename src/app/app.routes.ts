import { Routes } from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {MovieDetailComponent} from './components/movie-details/movie-detail.component';
import {GetStartedComponent} from './components/get-started/get-started.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

export const routes: Routes = [
  {path:'', component: GetStartedComponent},
  {path:'home', component: HomePageComponent},
  {path:'movie/:movieId', component: MovieDetailComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path: '**', component: NotFoundComponent},
];
