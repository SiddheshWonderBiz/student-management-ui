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
  }
  
];
