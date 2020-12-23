import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from './interfaces/user';
import { map } from 'rxjs/operators';
import { Papelaria } from './interfaces/papelaria';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private PATH_User = '/Users';
  private PATH_Materiais = '/Materiais';
  private PATH_PedidosPap = '/Pedidos_Pap';
  private PATH_Liberacao = '/Liberacao';

  constructor(private auth: AngularFireAuth, private bd: AngularFireDatabase, private afs: AngularFirestore) { }

  login(user: User){
    return this.auth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User){
    return this.auth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout(){
    return this.auth.auth.signOut();
  }

  getAuth(){
    return this.auth.auth;
  }


  getUser(): Observable<any> {
    return this.bd.list(this.PATH_User).snapshotChanges().pipe(map(result => {
      return result.map(data => {
        return data.payload.val();
      })
    }));
  }

  saveUser(user: User){
    return new Promise((resolve => {
      this.bd.list(this.PATH_User).push({id: user.email, user: user}).then(() => resolve);
    }));
  }



  getMateriais(){
    return this.bd.list(this.PATH_Materiais).snapshotChanges().pipe(map(result => {
      return result.map(data => {
        return data.payload.val();
      })
    }));
  }



  savePedidosPap(papelaria: Papelaria){
    return new Promise((resolve => {
      this.bd.list(this.PATH_PedidosPap).push({papelaria: papelaria}).then(() => resolve);
    }));    
  }

  updatePedidoPap(papelaria: Papelaria){
    return new Promise((resolve => {
      this.bd.object(this.PATH_PedidosPap + '/' + papelaria.id).update({papelaria: papelaria}).then(() => resolve);
    }));
  }

  getPedidosPap(): Observable<any>{
    return this.bd.list(this.PATH_PedidosPap).snapshotChanges().pipe(map(result => {
      return result.map(data => {
        return data.payload.val();
      })
    }));
  }

  savePedidosPapLiberacao(papelaria: Papelaria){
    return new Promise((resolve => {
      this.bd.list(this.PATH_Liberacao).push({papelaria: papelaria}).then(() => resolve);
    }));    
  }





  getKeysPap(){
    return this.bd.list(this.PATH_PedidosPap).snapshotChanges().pipe(map(result => {
      return result.map(data => {
        return data.payload.key;
      })
    }));
  }

  updateIdPap(id: any){
    return new Promise((resolve => {
      this.bd.object(this.PATH_PedidosPap + '/' + id + '/papelaria').update({id}).then(() => resolve);
    }));
  }

  updateStatusPap(id: any, status: any){
    return new Promise((resolve => {
      this.bd.object(this.PATH_PedidosPap + '/' + id + '/papelaria').update({status}).then(() => resolve);
    }));
  }

}
