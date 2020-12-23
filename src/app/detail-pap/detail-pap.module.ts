import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPapPageRoutingModule } from './detail-pap-routing.module';

import { DetailPapPage } from './detail-pap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPapPageRoutingModule
  ],
  declarations: [DetailPapPage]
})
export class DetailPapPageModule {}
