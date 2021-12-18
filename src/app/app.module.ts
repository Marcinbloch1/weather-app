import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NavComponent } from './_pages/nav/nav.component'

import { RegisterComponent } from './_pages/register/register.component'
import { HomeComponent } from './_pages/home/home.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { ConfirmationDialogComponent } from './_pages/user-page/confirmation-dialog/confirmation-dialog.component'

import { UserPageComponent } from './_pages/user-page/user-page.component'
import { LoginComponent } from './_pages/login/login.component'
import { LoadingInterceptor } from './_interceptors/loading.interceptor'
import { ErrorInterceptor } from './_interceptors/error.interceptor'
import { JwtInterceptor } from './_interceptors/jwt.interceptor'
import { AdminPageComponent } from './_pages/admin-page/admin-page.component'
import { HasRoleDirective } from './_directives/has-role.directive'
import { UserEditComponent } from './_pages/user-page/user-edit/user-edit.component'
import { SharedModule } from './shared.module'
import { NotFoundComponent } from './errors/not-found/not-found.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    HomeComponent,
    UserPageComponent,
    LoginComponent,
    AdminPageComponent,
    HasRoleDirective,
    ConfirmationDialogComponent,
    UserEditComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
