import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full',
  },
  {
    path: 'students',
    loadComponent: () =>
      import('./pages/students/student-list/student-list.component')
        .then(m => m.StudentListComponent),
  },
  {
    path: 'students/add',
    loadComponent: () =>
      import('./pages/students/add-student/add-student.component')
        .then(m => m.AddStudentComponent),
  },
  {
    path: 'students/edit/:id',
    loadComponent: () =>
      import('./pages/students/edit-student/edit-student.component')
        .then(m => m.EditStudentComponent),
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./pages/courses/course-list/course-list.component')
        .then(m => m.CourseListComponent),
  },
  {
    path : 'courses/add',
    loadComponent: () =>
      import('./pages/courses/course-add/course-add.component')
        .then(m => m.CourseAddComponent),
  },
  {
    path : 'courses/edit/:id',
    loadComponent: () =>
      import('./pages/courses/course-edit/course-edit.component')
        .then(m => m.CourseEditComponent),
  }
  
];
