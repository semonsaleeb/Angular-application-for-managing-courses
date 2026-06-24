import { Routes } from '@angular/router';
import { CoursesList } from './pages/courses-list/courses-list';
import { CourseForm } from './components/course-form/course-form';
import { CourseEdit } from './pages/course-edit/course-edit';
import { CourseDetails } from './pages/course-details/course-details';

export const coursesRoutes: Routes = [
  {
    path: '',
    component: CoursesList
  },
  {
    path: 'add',
    component: CourseForm
  },
  {
    path: 'edit/:id',
    component: CourseEdit
  },
  {
  path: 'details/:id',
  component: CourseDetails
}

];