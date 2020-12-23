import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {

  public current_email: any;
  public unitys_user: any;
  public list_pedidos_pap: any = [];
  public image: any = "assets/avatar/add.png";

  constructor(private provider: FirebaseService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.current_email = this.provider.getAuth().currentUser.email;

    this.provider.getUser().subscribe(user => {
      for(let i = 0; i < user.length; i++){
        if(this.current_email == user[i].id){
          this.unitys_user = user[i].user.unitys;
        }
      }
    });
    this.provider.getPedidosPap().subscribe(data => {
      for(let i = 0, j = data.length - 1; i < data.length, j >= 0 ; i++, j--){
        this.list_pedidos_pap[i] = data[j];
      }
    });

  }

  liberar(pedido: any){
    this.provider.updateStatusPap(pedido.papelaria.id, "Pronto");
  }

  negar(pedido: any){
    this.provider.updateStatusPap(pedido.papelaria.id, "Negado");
  }

  async showAlert(pedidoPap: any){
    const alert = await this.alertController.create({header: "Pedido", mode: "ios", message: "<strong>Solicitante:</strong> " + pedidoPap.papelaria.name_user + "<br><strong>Item:</strong> " + pedidoPap.papelaria.type + "<br><strong>Quantidade:</strong> " + pedidoPap.papelaria.amount + "<br><strong>Unidade:</strong> " + pedidoPap.papelaria.unity + "<br><strong>Detalhes:</strong> " + pedidoPap.papelaria.detail, buttons: [{ text: 'Fechar'}]});
    await alert.present();
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
