import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public user: User = {};
  public loading: any;
  public date: Date = new Date();
  public unitys = {};

  public password_confirm: any;

  constructor(private router: Router, private provider: FirebaseService, private loadingController: LoadingController, private toast: ToastController) {
    
  }

  ngOnInit() {

  }

  async register() {
    if(this.user.office == "manutenção"){
      this.user.unitys = null;
    }
    
    let flag: boolean = false;
    try {
      if (this.user.password == this.password_confirm) {
        await this.provider.register(this.user);
        this.provider.saveUser(this.user);
        flag = true;
      }
      else{
        this.presentToast('As senhas não conferem!');
      }

    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use': this.presentToast('E-mail já cadastrado!');
          break;
        case 'auth/invalid-email': this.presentToast('E-mail inválido!');
          break;
        case 'auth/weak-password': this.presentToast('Senha deve conter mais de 6 caracteres!');
          break;
      }
    }
    finally {
      if(flag == true){
        this.presentToast('E-mail cadastrado com sucesso!');
        this.router.navigate(['']);
      }
    };
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({ message: 'Aguarde...', duration: 3000 });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({ message, duration: 2000 });
    toast.present();
  }
}
