import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPapPage } from './detail-pap.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPapPageRoutingModule {}
