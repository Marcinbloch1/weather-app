import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { take } from 'rxjs/operators'
import { User } from 'src/app/_models/user'
import { Weather } from 'src/app/_models/weather'
import { AuthService } from 'src/app/_services/auth/auth.service'
import { ToastService } from 'src/app/_services/toast/toast.service'
import { UsersService } from 'src/app/_services/users/users.service'
import { WeatherService } from 'src/app/_services/weather/weather.service'
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component'

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator

  user!: User | null

  weatherList: Weather[] = []

  isWeather: boolean = false
  hide = true

  weatherPassword: string = ''

  weather$!: Observable<Weather[]>
  dataSource: MatTableDataSource<Weather> = new MatTableDataSource<Weather>()

  todayDate: Date = new Date()

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  })

  constructor(
    public authService: AuthService,
    private weatherService: WeatherService,
    private changeDetectorRef: ChangeDetectorRef,
    private usersService: UsersService,
    private toastService: ToastService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.authService.currentUser$.pipe(take(1)).subscribe((res) => {
      this.user = res
    })
  }

  ngOnInit(): void {}

  getAccess() {
    this.authService.isWeatherValid(this.weatherPassword).subscribe((res) => {
      this.isWeather = true
    })
  }

  showWeather() {
    this.weatherService
      .getWeatherByCity(this.user?.city?.latitude, this.user?.city?.longitude)
      .subscribe((res) => {
        this.weatherList = res
        if (this.range.value.end) {
          this.weatherList = this.weatherList.filter(
            (x) =>
              x.time < this.range.value.end._d.toISOString() &&
              x.time > this.range.value.start._d.toISOString()
          )
        }

        this.dataSource.data = this.weatherList
      })
    this.changeDetectorRef.detectChanges()
    this.dataSource.paginator = this.paginator
    this.weather$ = this.dataSource.connect()
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          cancel: 'CANCEL',
          ok: 'DELETE',
        },
      },
    })

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.usersService.deleteAccount().subscribe((res) => {
          this.toastService.presentToast(
            'Account deleted successfuly',
            'success-snackbar'
          )
          this.authService.logoutUser()
          this.router.navigate(['home'])
        })
      }
    })
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect()
    }
  }
}
