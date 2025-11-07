import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { EnrollmentService, Enrollment } from '../../../services/enrollment.service';

@Component({
  selector: 'app-enrollment-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, NbCardModule, NbButtonModule, RouterModule],
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.scss']
})
export class EnrollmentListComponent implements OnInit {
  enrollments: Enrollment[] = [];
  displayedColumns: string[] = ['student', 'course', 'grade', 'actions'];

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments() {
    this.enrollmentService.getEnrollments().subscribe({
      next: (data) => (this.enrollments = data),
      error: (err) => console.error('Error loading enrollments', err)
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this enrollment?')) {
      this.enrollmentService.deleteEnrollment(id).subscribe({
        next: () => this.loadEnrollments(),
        error: (err) => console.error('Error deleting enrollment', err)
      });
    }
  }
}
