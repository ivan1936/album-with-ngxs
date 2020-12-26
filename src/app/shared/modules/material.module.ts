import {NgModule} from '@angular/core'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
@NgModule({
  imports: [MatInputModule, MatIconModule, MatCardModule, MatButtonModule],
  exports: [MatInputModule, MatIconModule, MatCardModule, MatButtonModule],
})
export class MaterialModule {}
