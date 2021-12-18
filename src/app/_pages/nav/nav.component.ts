import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/_services/auth/auth.service'
import { ToastService } from 'src/app/_services/toast/toast.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  form!: FormGroup

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logoutUser()
    this.toastService.presentToast(
      'Logged out successfully',
      'success-snackbar'
    )
    this.router.navigate(['home'])
  }
}
