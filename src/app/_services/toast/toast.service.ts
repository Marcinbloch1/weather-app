import { Injectable } from '@angular/core'
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end'
  verticalPosition: MatSnackBarVerticalPosition = 'bottom'
  durationInSeconds: number = 2

  constructor(private _snackBar: MatSnackBar) {}

  presentToast(message: string, color: string) {
    this._snackBar.open(message, 'OK', {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [color],
    })
  }
}
