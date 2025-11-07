import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogService,
  NbToastrService,
} from '@nebular/theme';
import { ConfirmDeleteComponent } from '../../../shared/confirm-delete/confirm-delete.component';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    NbCardModule,
    MatTableModule,
    HttpClientModule,
    RouterModule,
    NbButtonModule,
  ],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  courses: any[] = [];
  displayedColumns: string[] = [ 'courseName', 'credits', 'actions'];

  constructor(
    private courseService: CourseService,
    private router: Router,
    private toastr: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        this.toastr.danger('Failed to load courses', 'Error');
      },
    });
  }

  onDelete(id: number): void {
    this.dialogService
      .open(ConfirmDeleteComponent)
      .onClose.subscribe((confirm: boolean) => {
        if (confirm) {
          this.courseService.deleteCourse(id).subscribe({
            next: () => {
              this.toastr.success('Course deleted successfully', 'Success');
              this.courses = this.courses.filter((c) => c.courseId !== id);
            },
            error: (error) => {
              console.error('Error deleting course:', error);
              this.toastr.danger('Failed to delete course', 'Error');
            },
          });
        }
      });
  }
}
