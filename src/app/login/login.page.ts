import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { User } from '../interfaces/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  public user: User = {};
  public loading: any;
  public office: any;
  
  public isTextFieldType: boolean;

  public usersSubscription: Subscription;

  constructor(private provider: FirebaseService, private loadingController: LoadingController, private toast: ToastController, private router: Router) { }

  viewPassword(){
    this.isTextFieldType = !this.isTextFieldType;
  }

  ngOnInit() {
    this.user.email = null;
    this.user.password = null;
    this.office = null;
  }

  ngOnDestroy() {
    this.user.email = null;
    this.user.password = null;
    this.usersSubscription.unsubscribe();
  }

  registrar() {
    this.router.navigate(['/register']);
  }

  async login() {
    let flag: Boolean = false;

    await this.presentLoading();

    try {
      await this.provider.login(this.user);
      flag = true;
    }
    catch (error) {
      console.log(error.code);
      switch (error.code) {
        case 'auth/argument-error': this.presentToast('Todos os campos devem ser preenchidos!');
          break;
        case 'auth/wrong-password': this.presentToast('Senha incorreta!');
          break;
        case 'auth/invalid-email': this.presentToast('E-mail inválido!');
          break;
        case 'auth/user-not-found': this.presentToast('Usuário não encontrado!');
          break;
        case 'auth/user-disabled': this.presentToast('Usuário desativado temporariamente!');
          break;
      }
    }
    finally {
      this.loading.dismiss();
      if (flag == true) { 
        this.usersSubscription = this.provider.getUser().subscribe(data => {
          for (let i = 0; i < data.length; i++) {
            if (this.user.email == data[i].user.email) {
              if ((data[i].user.office == "professor") || (data[i].user.office == "coordenador")) {
                this.router.navigate(['/tabs/tab1']);
              }
              else {
                if (data[i].user.office == "manutenção") {
                  this.router.navigate(['/tabs/tab2']);
                }
                else {
                  if (data[i].user.office == "almoxarife") {
                    this.router.navigate(['/tabs/tab6']);
                  } 
                }
              }
            }
          }
        })
      }
    };
}

async presentLoading() {
  this.loading = await this.loadingController.create({ message: 'Aguarde...' });
  return this.loading.present();
}

async presentToast(message: string){
  const toast = await this.toast.create({ message, duration: 2000 });
  toast.present();
}

}
