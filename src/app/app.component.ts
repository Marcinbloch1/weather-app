import { Component, OnInit } from '@angular/core'
import { User } from './_models/user'
import { AuthService } from './_services/auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user!: User

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setCurrentUser()
  }

  setCurrentUser() {
    var tempUser = localStorage.getItem('user')
    this.user = JSON.parse(tempUser!)
    this.authService.setCurrentUser(this.user)
  }
}
