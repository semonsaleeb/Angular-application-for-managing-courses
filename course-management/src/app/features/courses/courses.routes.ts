import { Routes } from '@angular/router';
import { CoursesList } from './pages/courses-list/courses-list';
import { CourseForm } from './components/course-form/course-form';

export const coursesRoutes: Routes = [
  {
    path: '',
    component: CoursesList
  },
  {
    path: 'add',
    component: CourseForm
  }
];