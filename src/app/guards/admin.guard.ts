import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthService } from '../_services/auth/auth.service'
import { ToastService } from '../_services/toast/toast.service'

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user) => {
        if (user?.role === 'Admin') return true

        this.toastService.presentToast(
          'You cannot enter this area',
          'danger-snackbar'
        )
        return false
      })
    )
  }
}
