import { Component } from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HomePage } from './pages/home/home.page';
import { RegisterPage } from './pages/register/register.page';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  rootPage: any = RegisterPage;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) {
    const authObserver = afAuth.authState.subscribe( user => {
      console.log(user);
      if (user){
        this.navCtrl.navigateRoot('/home');
        authObserver.unsubscribe();
      }
      else{
        this.navCtrl.navigateRoot('/login');
        authObserver.unsubscribe();
      }
    });

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
