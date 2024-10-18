import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProfileComponent } from './components/list-profile/list-profile.component';
import { IonicModule } from '@ionic/angular';
import { TableComponent } from './components/table/table.component';
import { FormsModule } from '@angular/forms';
import { MaskitoDirective } from '@maskito/angular';


@NgModule({
  declarations: [
    ListProfileComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    MaskitoDirective,
  ],
  exports: [
    ListProfileComponent,
    TableComponent,
  ]
})
export class SharedModule { }
