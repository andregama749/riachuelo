import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideFab]'
})
export class HideFabDirective implements OnInit{

  @Input('appHideFab') fab: any;

  constructor(private renderer: Renderer2, private domCtrl: DomController, private element: ElementRef) { 

  }
  ngOnInit(){
    this.fab = this.fab.el;
    this.renderer.setStyle(this.fab, "webkitTransition", "opacity 500ms");
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event){
    const scrollTop = $event.detail.scrollTop;
    //console.log(scrollTop);

    if(scrollTop > 20){
      this.renderer.setStyle(this.fab, "opacity", "0");
      this.renderer.setStyle(this.fab, "margin-bottom", "50000%");
    }
    else if(scrollTop < 20){
      this.renderer.setStyle(this.fab, "opacity", "1");
      this.renderer.setStyle(this.fab, "margin-bottom", "0%");
    }
  }

}
