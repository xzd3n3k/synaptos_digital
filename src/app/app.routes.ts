import { Routes } from '@angular/router';
import {HomeScreen} from './screens/home-screen/home-screen';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeScreen,
  },
];
