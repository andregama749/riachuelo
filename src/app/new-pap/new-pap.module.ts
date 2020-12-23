import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPapPageRoutingModule } from './new-pap-routing.module';

import { NewPapPage } from './new-pap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPapPageRoutingModule
  ],
  declarations: [NewPapPage]
})
export class NewPapPageModule {}
