import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from '../_services/auth/auth.service'
import { take } from 'rxjs/operators'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const skipIntercept = request.headers.has('skip')
    if (skipIntercept) {
      request = request.clone({
        headers: request.headers.delete('skip'),
      })
      return next.handle(request)
    }
    let currentUser: any
    this.authService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (currentUser = user))

    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
    }

    return next.handle(request)
  }
}
