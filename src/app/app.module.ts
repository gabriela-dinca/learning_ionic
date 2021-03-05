import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import firebase from 'firebase';
import initializeApp = firebase.initializeApp;
import {LoginPage} from './login/login.page';
import {RegisterPage} from './register/register.page';
import {PasswordResetPage} from './password-reset/password-reset.page';
import {ReactiveFormsModule} from '@angular/forms';


export const firebaseConfig = {
  apiKey: 'AIzaSyBR_mzRMcMPujGTuKJ5nl0EIaLhVv16NBA',
  authDomain: 'todolist-cfacf.firebaseapp.com',
  projectId: 'todolist-cfacf',
  storageBucket: 'todolist-cfacf.appspot.com',
  messagingSenderId: '906500125116',
  appId: '1:906500125116:web:abdd058ef9868a95d43bb9'
};


@NgModule({
  declarations: [
    AppComponent,
    // LoginPage,
    // RegisterPage,
    // PasswordResetPage
  ],
  entryComponents: [
    LoginPage,
    RegisterPage,
    PasswordResetPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
