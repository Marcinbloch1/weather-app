import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSelectModule } from '@angular/material/select'
import { MatSliderModule } from '@angular/material/slider'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { NgxPrintModule } from 'ngx-print'
import { NgxSpinnerModule } from 'ngx-spinner'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSnackBarModule,
    NgxPrintModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatAutocompleteModule,
    MatTabsModule,
    MatSnackBarModule,
    NgxPrintModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class SharedModule {}
