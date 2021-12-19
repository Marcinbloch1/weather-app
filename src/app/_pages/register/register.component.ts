import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Country, City } from 'country-state-city'
import { Observable, Subscription } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { ICountry } from 'country-state-city/dist/lib/interface'
import { generator } from 'ts-password-generator'
import { AuthService } from 'src/app/_services/auth/auth.service'
import { Router } from '@angular/router'
import { ToastService } from 'src/app/_services/toast/toast.service'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import {
  matchValidator,
  RequireMatch,
} from 'src/app/validators/form-validators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup

  countryInfo: ICountry[] = Country.getAllCountries()
  filteredCountryOptions$!: Observable<any[]>

  cityInfo: any = []
  filteredCityOptions$!: Observable<any[]>

  hide = true
  hide2 = true

  country = new FormControl('', [Validators.required, RequireMatch])
  city = new FormControl('', [Validators.required, RequireMatch])
  firstName = new FormControl('', [Validators.required])
  lastName = new FormControl('', [Validators.required])
  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$'
    ),
    matchValidator('confirmPassword', true),
  ])
  confirmPassword = new FormControl('', [
    Validators.required,
    matchValidator('password'),
  ])

  @ViewChild(MatAutocompleteTrigger) trigger!: MatAutocompleteTrigger

  subscription!: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      country: this.country,
      city: this.city,
    })

    this.filteredCountryOptions$ = this.country.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) =>
        name ? this._filterCountry(name) : this.countryInfo.slice()
      )
    )
  }

  generatePassword() {
    const password = generator({
      haveNumbers: true,
      charsQty: 16,
      isUppercase: true,
    })
    this.password.patchValue(password)
  }

  private _filterCountry(val: string) {
    return val
      ? this.countryInfo.filter(
          (s) => s.name.toLowerCase().indexOf(val.toLowerCase()) > -1
        )
      : this.countryInfo
  }

  getCities(event: any) {
    this.cityInfo = City.getCitiesOfCountry(event)

    if (this.countryInfo) {
      this.filteredCityOptions$ = this.city.valueChanges.pipe(
        startWith(null),
        map((name) => this.filterCities(name))
      )
    }
  }

  filterCities(val: string) {
    if (val && val.length >= 3) {
      return this.cityInfo.filter((s: { name: string }) =>
        s.name.toLowerCase().includes(val.toLowerCase())
      )
    } else {
      return []
    }
  }

  checkValue(value: any) {
    return value ? value.name : value
  }

  submit(): void {
    this.authService.registerUser(this.form.value).subscribe((res) => {
      this.toastService.presentToast('Register successful', 'success-snackbar')
      this.router.navigate(['user-page'])
    })
  }

  getEmail() {
    if (this.email?.hasError('required')) {
      return 'Please enter email'
    } else if (this.email?.hasError('email')) {
      return 'Not valid email'
    }
    return ''
  }

  getPassword() {
    if (this.password?.hasError('required')) {
      return 'Enter the password or click the key to generate one'
    } else if (this.password?.hasError('pattern')) {
      return 'Password at least 8 chars, 1 uppercase, 1 lowercase, 1 digit'
    }
    return ''
  }

  getConfirmPassword() {
    if (this.confirmPassword?.hasError('required')) {
      return 'Confirm the password'
    } else if (this.confirmPassword?.hasError('matching')) {
      return 'Password must match'
    }
    return ''
  }
}
