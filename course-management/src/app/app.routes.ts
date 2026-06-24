import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/courses.routes')
        .then(m => m.coursesRoutes)
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  }
];