import { Component, HostListener, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { MatAutocompleteTrigger } from '@angular/material/autocomplete'
import { Router } from '@angular/router'
import { Country, City } from 'country-state-city'
import { ICountry } from 'country-state-city/dist/lib/interface'
import { Observable, Subscription } from 'rxjs'
import { startWith, map, take } from 'rxjs/operators'
import { User } from 'src/app/_models/user'
import { AuthService } from 'src/app/_services/auth/auth.service'
import { ToastService } from 'src/app/_services/toast/toast.service'
import { UsersService } from 'src/app/_services/users/users.service'
import { generator } from 'ts-password-generator'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.form.dirty) {
      $event.returnValue = true
    }
  }

  countryInfo: ICountry[] = Country.getAllCountries()
  filteredCountryOptions$!: Observable<any[]>

  cityInfo: any = []
  filteredCityOptions$!: Observable<any[]>

  hide = true
  hide2 = true

  user!: User | null

  country = new FormControl('', [Validators.required])
  city = new FormControl('', [Validators.required])
  firstName!: FormControl
  lastName!: FormControl
  email!: FormControl
  oldPassword!: FormControl
  newPassword!: FormControl

  @ViewChild(MatAutocompleteTrigger) trigger!: MatAutocompleteTrigger

  subscription!: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private usersService: UsersService
  ) {
    this.authService.currentUser$.pipe(take(1)).subscribe((res) => {
      this.user = res
    })
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: (this.firstName = new FormControl(this.user?.firstname, [
        Validators.required,
      ])),
      lastName: (this.lastName = new FormControl(this.user?.lastname, [
        Validators.required,
      ])),
      email: (this.email = new FormControl(this.user?.email, [
        Validators.required,
        Validators.email,
      ])),
      oldPassword: (this.oldPassword = new FormControl('', [
        Validators.required,
      ])),
      newPassword: (this.newPassword = new FormControl('', [
        Validators.pattern(
          '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$'
        ),
      ])),
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

    let dataCountry = this.countryInfo.find((x) => x.name == this.user?.country)
    this.country.setValue(dataCountry)
    let dataCity = this.getCities(dataCountry)
    this.city.setValue(
      dataCity.find(
        (x: { name: string | undefined }) => x.name == this.user?.city?.name
      )
    )
  }

  generatePassword() {
    const password = generator({
      haveNumbers: true,
      charsQty: 16,
      isUppercase: true,
    })
    this.newPassword.patchValue(password)
  }

  private _filterCountry(val: string) {
    return val
      ? this.countryInfo.filter(
          (s) => s.name.toLowerCase().indexOf(val.toLowerCase()) > -1
        )
      : this.countryInfo
  }

  getCities(event: any) {
    this.cityInfo = City.getCitiesOfCountry(event.isoCode)

    if (this.countryInfo) {
      this.filteredCityOptions$ = this.city.valueChanges.pipe(
        startWith(null),
        map((name) => this.filterCities(name))
      )
    }
    return this.cityInfo
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
    this.usersService.updateUser(this.form.value).subscribe((res) => {
      this.toastService.presentToast(
        'User updated successfully',
        'success-snackbar'
      )
      this.form.reset(this.form.value)
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
    if (this.newPassword?.hasError('pattern')) {
      return 'Password at least 8 chars, 1 uppercase, 1 lowercase, 1 digit'
    }
    return ''
  }
}
