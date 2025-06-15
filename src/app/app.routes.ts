import { Routes } from '@angular/router';
import {Home} from './screens/home/home';
import {DesignSystem} from './screens/design-system/design-system';
import {OurServices} from './screens/our-services/our-services';
import {About} from './screens/about/about';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'our-services',
    component: OurServices,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'design-system',
    component: DesignSystem,
  },
];
