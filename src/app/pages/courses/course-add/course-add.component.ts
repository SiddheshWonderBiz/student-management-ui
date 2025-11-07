import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbToastrService,
} from '@nebular/theme';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-course-add',
  standalone: true,
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss'],
})
export class CourseAddComponent implements OnInit {
  courseForm: any;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private toastr: NbToastrService
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      courseName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z0-9\s]+$/),
        ],
      ],
      credits: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
    });
  }

  get f() {
    return this.courseForm.controls;
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      this.submitting = false;
      return;
    }

    this.submitting = true;
    const payload = this.courseForm.value;

    this.courseService.addCourse(payload).subscribe({
      next: (res) => {
        this.toastr.success(res?.message ?? 'Course added successfully', 'Success');
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        const msg = err?.error?.message ?? 'Unable to add course';
        this.toastr.danger(msg, 'Error');
        this.submitting = false;
      },
    });
  }
}
