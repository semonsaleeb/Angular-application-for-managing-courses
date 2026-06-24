import { Routes } from '@angular/router';
import { CoursesList } from './features/courses/pages/courses-list/courses-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
  {
    path: 'courses',
    component: CoursesList,
  },
];