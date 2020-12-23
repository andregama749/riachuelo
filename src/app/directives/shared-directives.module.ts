import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideFabDirective } from './hide-fab.directive';
import { FadeFabDirective } from './fade-fab.directive';

@NgModule({
  declarations: [HideFabDirective, FadeFabDirective],
  imports: [CommonModule],
  exports: [HideFabDirective, FadeFabDirective]
})
export class SharedDirectivesModule { }
