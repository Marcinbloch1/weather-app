import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
import { User } from 'src/app/_models/user'
import { AuthService } from 'src/app/_services/auth/auth.service'
import { ToastService } from 'src/app/_services/toast/toast.service'
import { UsersService } from 'src/app/_services/users/users.service'

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  form!: FormGroup

  hide = true

  users$!: Observable<User[]>

  email = new FormControl('')
  password = new FormControl('')

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private usersService: UsersService
  ) {
    this.users$ = this.usersService.getUsers()
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: this.email,
      password: this.password,
    })
  }

  submitWeatherPassword(): void {
    this.authService.setUserWeatherPassword(this.form.value).subscribe(() => {
      this.toastService.presentToast(
        'Password assigned successfully',
        'success-snackbar'
      )
      this.form.reset()
    })
  }
}
