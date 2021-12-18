import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Observable, ReplaySubject } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { User } from 'src/app/_models/user'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accountUrl = environment.apiUrl + '/Account'
  private registerUrl = environment.apiUrl + '/Account/register'
  private loginUrl = environment.apiUrl + '/Account/login'
  private weatherUrl = environment.apiUrl + '/Account/weather'

  private currentUserSource = new ReplaySubject<User | null>(1)
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private http: HttpClient) {}

  registerUser(form: FormBuilder): Observable<any> {
    return this.http.post(this.registerUrl, form).pipe(
      map((res: User) => {
        const user = res
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user)
        }
        return user
      })
    )
  }

  loginUser(form: FormBuilder): Observable<any> {
    return this.http.post(this.loginUrl, form).pipe(
      map((res: User) => {
        const user = res
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user)
        }
        return user
      })
    )
  }

  setUserWeatherPassword(form: FormBuilder): Observable<any> {
    return this.http.put(this.accountUrl, form)
  }

  isWeatherValid(weatherPassword: string) {
    return this.http
      .get(`${this.weatherUrl}/${weatherPassword}`)
      .pipe(tap((res) => {}))
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user)
  }

  logoutUser() {
    localStorage.removeItem('user')
    this.currentUserSource.next(null)
  }
}
