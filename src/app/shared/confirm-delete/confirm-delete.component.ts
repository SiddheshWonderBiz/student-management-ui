import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule , NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirm-delete',
  imports: [CommonModule, NbCardModule, NbButtonModule],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss',
   
})
export class ConfirmDeleteComponent {
  constructor(protected dialogRef: NbDialogRef<ConfirmDeleteComponent>) {}

  confirm(result: boolean) {
    this.dialogRef.close(result);
  }

}
