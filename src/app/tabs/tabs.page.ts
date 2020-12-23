import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  public current_email: any;
  public current_office: any;

  public usersSubscription: Subscription;

  constructor(private provider: FirebaseService) {
    
  }

  ngOnInit(){
    
    this.current_email = this.provider.getAuth().currentUser.email;

    this.usersSubscription = this.provider.getUser().subscribe(data => {
      for(let i = 0; i < data.length; i++){
          if(this.current_email == data[i].user.email){
            this.current_office = data[i].user.office;
          }
      }
    });
  }

}
