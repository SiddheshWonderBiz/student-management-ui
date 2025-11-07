import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule , NbInputModule ,NbToastrService} from '@nebular/theme';
import { Form, FormBuilder, ReactiveFormsModule, Validators,FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-student',
  imports: [CommonModule, NbCardModule, NbButtonModule, NbInputModule, ReactiveFormsModule, RouterModule],
  standalone: true,
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss'
})
export class EditStudentComponent {
  studentForm!: FormGroup;
  studentId!: number;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: NbToastrService
  ) {}

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.studentForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100),Validators.pattern(/^[a-zA-Z\s]+$/),Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      dateOfBirth: ['', [Validators.required]],
    });
    this.loadStudent();
  }
  get f() {
    return this.studentForm.controls;
  }
  loadStudent() {
  this.api.getStudentById(this.studentId).subscribe({
    next: (student) => {
      // Convert ISO date "2000-05-15T00:00:00" → "2000-05-15"
      if (student.dateOfBirth) {
        student.dateOfBirth = student.dateOfBirth.split('T')[0];
      }

      this.studentForm.patchValue(student);
    },
    error: () => this.toastr.danger('Failed to load student details')
  });
}


  onSubmit() {
    this.submitting = true;
    if (this.studentForm.invalid) {
      this.submitting = false;
      return;
    }
    this.api.updateStudent(this.studentId, this.studentForm.value).subscribe({
      next: () => {
        this.toastr.success('Student updated successfully', 'Success');   
        this.router.navigate(['/students']);
      },
      error: () => {
        this.toastr.danger('Failed to update student', 'Error');
        this.submitting = false;
      }
    });
  }

  cancel(){
    this.router.navigate(['/students']);
  }
}
