import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import {
  NbButtonModule,
  NbCardModule,
  NbDialogService,
  NbToastrService,
} from '@nebular/theme';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { ConfirmDeleteComponent } from '../../../shared/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-student-list',
  imports: [
    CommonModule,
    NbCardModule,
    MatTableModule,
    HttpClientModule,
    RouterModule,
    NbButtonModule,
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
  standalone: true,
})
export class StudentListComponent {
  students: any[] = [];

  displayedColumns: string[] = [ 'name', 'email', 'actions'];
  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: NbToastrService,
    private dialogService: NbDialogService
  ) {}
  ngOnInit(): void {
    this.api.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (error) => {
        console.error('Error fetching students:', error);
      },
    });
  }

  onDelete(id: number) {
    this.dialogService
      .open(ConfirmDeleteComponent)
      .onClose.subscribe((confirm: boolean) => {
        if (confirm) {
          this.api.deleteStudent(id).subscribe({
            next: () => {
              this.toastr.success('Student deleted successfully', 'Success');
              this.students = this.students.filter((s) => s.id !== id);
            },
            error: (error) => {
              console.error('Error deleting student:', error);
              this.toastr.danger('Failed to delete student', 'Error');
            },
          });
        }
      });
  }
}
