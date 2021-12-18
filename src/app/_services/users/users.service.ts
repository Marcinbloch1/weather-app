import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { User } from 'src/app/_models/user'
import { environment } from 'src/environments/environment'
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersUrl = environment.apiUrl + '/Users'

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<any> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(
        map(
          (users: User[]) => users.map((p) => p.id) && users.map((p) => p.email)
        )
      )
  }

  updateUser(form: FormBuilder): Observable<any> {
    return this.http.put(this.usersUrl, form).pipe(
      map((res: User) => {
        const user = res
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.authService.setCurrentUser(user)
        }
        return user
      })
    )
  }

  deleteAccount() {
    return this.http.delete(this.usersUrl)
  }
}
