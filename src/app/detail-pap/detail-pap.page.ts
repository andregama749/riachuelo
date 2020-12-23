import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Papelaria } from '../interfaces/papelaria';

@Component({
  selector: 'app-detail-pap',
  templateUrl: './detail-pap.page.html',
  styleUrls: ['./detail-pap.page.scss'],
})
export class DetailPapPage implements OnInit {

  public current_email: any;
  public list_users: Observable<any> = null;
  public image: any = "assets/avatar/add.png";
  public pedido: Papelaria = {};

  constructor(private provider: FirebaseService, private router: Router, private param: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {

    this.current_email = this.provider.getAuth().currentUser.email;
    this.list_users = this.provider.getUser();


    this.param.params.subscribe(id_pedido => {
      this.provider.getPedidosPap().subscribe(data => {
        for(let i = 0; i < data.length; i++){
          if(id_pedido['pedido'] == data[i].papelaria.id){
            this.pedido = data[i].papelaria;
          }
        }
      })
    })
  }

  update(){
    try{
      this.provider.updatePedidoPap(this.pedido);
      this.showAlert('Pedido atualizado com sucesso!');
    }catch(error){
      console.error();
    };
  }

  async showAlert(text: any){
    const confirm = await this.alertController.create({message: text, buttons: [{text: 'Fechar'}]});
    await confirm.present();
  }

}
