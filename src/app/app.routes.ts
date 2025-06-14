import { Routes } from '@angular/router';
import {HomeScreen} from './screens/home-screen/home-screen';
import {DesignSystem} from './screens/design-system/design-system';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeScreen,
  },
  {
    path: 'design-system',
    component: DesignSystem,
  },
];
