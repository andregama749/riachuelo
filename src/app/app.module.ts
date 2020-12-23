import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB-CCHnPhhSMYDaDQDGWOD2nohKtxF24ts",
    authDomain: "gerenciamateriaiscer.firebaseapp.com",
    databaseURL: "https://gerenciamateriaiscer.firebaseio.com",
    projectId: "gerenciamateriaiscer",
    storageBucket: "gerenciamateriaiscer.appspot.com",
    messagingSenderId: "1007532645434",
    appId: "1:1007532645434:web:13e604ee8e2d206b482903"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule, 
    AngularFirestoreModule,
    IonicModule.forRoot(), 
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    LottieSplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
