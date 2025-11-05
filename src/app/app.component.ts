import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbLayoutModule, NbMenuModule, NbSidebarModule } from '@nebular/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ,NbLayoutModule,NbSidebarModule,NbMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'student-management-ui';
  menuItems = [
    { title: 'Students', link: '/students', icon: 'people-outline' },
    { title: 'Courses', link: '/courses', icon: 'book-outline' },
    { title: 'Enrollments', link: '/enrollments', icon: 'clipboard-outline' },
  ];
}
