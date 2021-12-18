import { Component, OnInit, Inject } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  message: string = 'Are you sure?'
  cancelButtonText = 'Cancel'
  confirmButtonText = 'Yes'
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {
    if (data) {
      this.message = data.message || this.message
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText
      }
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true)
  }

  ngOnInit() {}
}
