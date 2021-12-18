import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from './errors/not-found/not-found.component'
import { AdminGuard } from './guards/admin.guard'
import { AuthGuard } from './guards/auth.guard'
import { LoggedInGuard } from './guards/logged-in.guard'
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard'
import { AdminPageComponent } from './_pages/admin-page/admin-page.component'
import { HomeComponent } from './_pages/home/home.component'
import { LoginComponent } from './_pages/login/login.component'
import { RegisterComponent } from './_pages/register/register.component'
import { UserEditComponent } from './_pages/user-page/user-edit/user-edit.component'
import { UserPageComponent } from './_pages/user-page/user-page.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [LoggedInGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user-page',
        component: UserPageComponent,
      },
      {
        path: 'admin-page',
        component: AdminPageComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'user-page/user-edit',
        component: UserEditComponent,
        canDeactivate: [PreventUnsavedChangesGuard],
      },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
