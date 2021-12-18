import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { Router, NavigationExtras } from '@angular/router'
import { catchError } from 'rxjs/operators'
import { ToastService } from '../_services/toast/toast.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastService: ToastService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = []
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key])
                  }
                }
                throw modalStateErrors.flat()
              } else {
                this.toastService.presentToast(
                  `${error.status} ${
                    error.statusText === 'OK'
                      ? 'Bad Request: ' + error.error
                      : error.statusText
                  }`,
                  'danger-snackbar'
                )
              }
              break

            case 401:
              this.toastService.presentToast(
                `${error.status} ${
                  error.statusText === 'OK' ? 'Unauthorized' : error.statusText
                }`,
                'danger-snackbar'
              )
              break

            case 404:
              this.router.navigateByUrl('/not-found')
              break

            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              }
              this.router.navigateByUrl('/server-error', navigationExtras)
              break

            default:
              this.toastService.presentToast(
                'Something unexpected went wrong',
                'danger-snackbar'
              )
              console.log(error)
              break
          }
        }
        return throwError(error)
      })
    )
  }
}
