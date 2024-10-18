import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ExploreContainerComponentModule } from 'src/app/components/explore-container/explore-container.module';
import { TableComponent } from 'src/app/components/table/table.component';
import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    MaskitoDirective,
  ],
  declarations: [Tab1Page, TableComponent],
})
export class Tab1PageModule {}
