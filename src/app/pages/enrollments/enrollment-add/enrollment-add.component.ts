import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbCardModule, NbButtonModule, NbSelectModule, NbInputModule, NbToastrService } from '@nebular/theme';
import { EnrollmentService } from '../../../services/enrollment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-enrollment-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule
  ],
  templateUrl: './enrollment-add.component.html',
  styleUrls: ['./enrollment-add.component.scss']
})
export class EnrollmentAddComponent implements OnInit {
  enrollmentForm!: FormGroup;
  students: any[] = [];
  courses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private enrollmentService: EnrollmentService,
    private http: HttpClient,
    private router: Router,
    private toastr: NbToastrService
  ) {}

  ngOnInit(): void {
    this.enrollmentForm = this.fb.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required],
      grade: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });

    this.loadStudents();
    this.loadCourses();
  }

  loadStudents() {
    this.http.get<any[]>('https://localhost:7176/api/Students').subscribe({
      next: (data) => (this.students = data),
      error: (err) => console.error('Error loading students', err),
    });
  }

  loadCourses() {
    this.http.get<any[]>('https://localhost:7176/api/Courses').subscribe({
      next: (data) => (this.courses = data),
      error: (err) => console.error('Error loading courses', err),
    });
  }

  onSubmit() {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }

    this.enrollmentService.addEnrollment(this.enrollmentForm.value).subscribe({
      next: () => {
        this.toastr.success('Enrollment added successfully!', 'Success');
        this.router.navigate(['/enrollments']);
      },
      error: (err) => {
        console.error('Error creating enrollment', err);
        this.toastr.danger(err.error?.message || 'Error adding enrollment', 'Failed');
      },
    });
  }
}
