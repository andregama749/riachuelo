import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {

  constructor(private provider: FirebaseService) { }

  ngOnInit() {
  }

  async logout(){
    try{
      await this.provider.logout();
    }
    catch(error){
      console.error();
    }
  }
}
