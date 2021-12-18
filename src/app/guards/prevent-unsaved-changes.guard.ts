import { Injectable } from '@angular/core'
import { CanDeactivate } from '@angular/router'
import { UserEditComponent } from '../_pages/user-page/user-edit/user-edit.component'

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: UserEditComponent): boolean {
    if (component.form.dirty) {
      return confirm(
        'Are you sure you want to leave this page? Any unsaved changes will be lost'
      )
    }
    return true
  }
}
