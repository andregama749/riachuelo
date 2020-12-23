import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Papelaria } from '../interfaces/papelaria';

@Component({
  selector: 'app-new-pap',
  templateUrl: './new-pap.page.html',
  styleUrls: ['./new-pap.page.scss'],
})
export class NewPapPage implements OnInit, OnDestroy {

  public papelaria: Papelaria = {};
  public current_email: any;
  public list_unitys: any;
  public list_materiais: Observable<any> = null;
  public list_users: Observable<any> = null;
  public image: any = "assets/avatar/add.png";

  public usersSubscription: Subscription;

  constructor(private provider: FirebaseService, private alertController: AlertController) { }
  
  ngOnDestroy(){
    try{
      this.usersSubscription.unsubscribe();
      console.log("dest");
    }
    catch{}
    
  }

  ngOnInit() {

    this.current_email = this.provider.getAuth().currentUser.email;
    this.papelaria.id_user = this.current_email;

    this.list_users = this.provider.getUser();

    this.list_materiais = this.provider.getMateriais();
  }

  save(){
    try {
      this.usersSubscription = this.provider.getUser().subscribe(data => {
        for(let i = 0; i < data.length; i++){
          if(data[i].id == this.current_email){
            this.papelaria.name_user = data[i].user.name;
            if(data[i].user.office == 'professor' || data[i].user.office == 'administrativo'){
              this.papelaria.status = "Aguardando liberação";
            }
            if(data[i].user.office == 'coordenador'){
              this.papelaria.status = "Aguardando separação";
            }
          }
        }
        this.provider.savePedidosPap(this.papelaria);

        this.provider.getKeysPap().subscribe(key => {    // atualizar o id
          this.provider.updateIdPap(key[key.length - 1])
        });
      })
    }
    catch{
      
    }
    finally{
      this.showAlert();
    }
    
  }

  selectImage(){
    console.log("Troca image");
  }

  async showAlert(){
    const confirm = await this.alertController.create({message: 'Pedido enviado com sucesso!', buttons: [{text: 'Fechar'}]});
    await confirm.present();
  }

}
