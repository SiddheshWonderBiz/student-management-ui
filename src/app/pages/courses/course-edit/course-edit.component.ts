import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbToastrService,
} from '@nebular/theme';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-course-edit',
  standalone: true,
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent {
  courseForm!: FormGroup;
  courseId!: number;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: NbToastrService
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

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

    this.loadCourse();
  }

  get f() {
    return this.courseForm.controls;
  }

  loadCourse() {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.courseForm.patchValue({
          courseName: course.courseName,
          credits: course.credits,
        });
      },
      error: () => {
        this.toastr.danger('Failed to load course details', 'Error');
      },
    });
  }

  onSubmit() {
    this.submitting = true;
    if (this.courseForm.invalid) {
      this.submitting = false;
      return;
    }

    this.courseService.updateCourse(this.courseId, this.courseForm.value).subscribe({
      next: () => {
        this.toastr.success('Course updated successfully', 'Success');
        this.router.navigate(['/courses']);
      },
      error: () => {
        this.toastr.danger('Failed to update course', 'Error');
        this.submitting = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/courses']);
  }
}
