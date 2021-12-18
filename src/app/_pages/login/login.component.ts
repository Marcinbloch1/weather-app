import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from 'src/app/_services/auth/auth.service'
import { ToastService } from 'src/app/_services/toast/toast.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  hide = true

  email = new FormControl('')
  password = new FormControl('')

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: this.email,
      password: this.password,
    })
  }

  submit(): void {
    this.authService.loginUser(this.form.value).subscribe((res) => {
      this.toastService.presentToast('Login successful', 'success-snackbar')
      this.router.navigate(['user-page'])
    })
  }
}
