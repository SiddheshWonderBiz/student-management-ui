import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbToastrService,
} from '@nebular/theme';
import { ApiService } from '../../../services/api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  studentForm: any;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toastr: NbToastrService
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      fullName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(100),Validators.pattern(/^[a-zA-Z\s]+$/)],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
      dateOfBirth: ['', [Validators.required]],
    });
  }

  get f() {
    return this.studentForm.controls;
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.submitting = false;
      return;
    }

    this.submitting = true;
    const raw = this.studentForm.value;

    const payload = {
      fullName: raw.fullName,
      email: raw.email,
      dateOfBirth: new Date(raw.dateOfBirth).toISOString(),
    };

    this.api.addStudent(payload).subscribe({
      next: (res) => {
        this.toastr.success(res?.message ?? 'Student added', 'Success');
        this.router.navigate(['/students']);
      },
      error: (err) => {
        const msg = err?.error?.message ?? 'Unable to add student';
        this.toastr.danger(msg, 'Error');
        this.submitting = false;
      },
    });
  }
}
