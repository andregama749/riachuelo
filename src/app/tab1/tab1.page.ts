import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Papelaria } from '../interfaces/papelaria';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public loading: any;
  public current_email: any;
  public list_pedidos: any = [];
  public image: any = "assets/avatar/add.png";

  public usersSubscrition: Subscription;

  constructor(private provider: FirebaseService, private router: Router, private loadingController: LoadingController, private alertController: AlertController) {}

  ngOnInit(){
    this.presentLoading();

    this.current_email = this.provider.getAuth().currentUser.email;
    this.provider.getPedidosPap().subscribe(data => {
      for(let i = 0, j = data.length - 1; i < data.length, j >= 0 ; i++, j--){
        this.list_pedidos[i] = data[j];
      }
    });
  }

  editPedido(pedido: Papelaria){
    if(pedido.status != 'Aguardando liberação'){
      this.showAlert('Pedido não poderá ser atualizado!');
    }
    else{
      this.router.navigate(['/detail-pap', pedido.id]);
    }
  }

  async logout(){
    try{
      await this.provider.logout();
    }
    catch(error){
      console.error();
    }
  }

  add(){
    this.router.navigate(['/new-pap']);
  }

  async Dismiss() {
    this.loading = await this.loadingController.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({ message: 'Aguarde...', duration: 3000});
    return this.loading.present();
  }

  async showAlert(text: any){
    const alert = await this.alertController.create({mode: "ios", message: text, buttons: [{ text: 'Fechar'}]});
    await alert.present();
  }

  async showAlert2(pedidoPap: any){
    const alert = await this.alertController.create({header: "Pedido", mode: "ios", message: "<strong>Solicitante:</strong> " + pedidoPap.papelaria.name_user + "<br><strong>Item:</strong> " + pedidoPap.papelaria.type + "<br><strong>Quantidade:</strong> " + pedidoPap.papelaria.amount + "<br><strong>Unidade:</strong> " + pedidoPap.papelaria.unity + "<br><strong>Detalhes:</strong> " + pedidoPap.papelaria.detail, buttons: [{ text: 'Fechar'}]});
    await alert.present();
  }

}
