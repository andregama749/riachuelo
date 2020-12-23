import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public usersSubscrition: Subscription;

  constructor(private provider: FirebaseService, private alertCtrl: AlertController, private router: Router) {}
  
  
  ngOnInit() {
    //this.showAlert();
  }

  async logout(){
    try{
      await this.provider.logout();
    }
    catch(error){
      console.error();
    }
  }

  async showAlert(){
    const confirm = await this.alertCtrl.create({message: 'Novas funcionalidades em versões futuras.', buttons: [{text: 'Fechar', handler: () => {this.router.navigate(['/tabs/tab1']);} }]});
    await confirm.present();
  }

}
