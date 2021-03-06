import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, AlertController, LoadingController} from '@ionic/angular';
import {EmailValidator} from '../../validators/email';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(
      public navCtrl: NavController,
      public formBuilder: FormBuilder,
      public alertCtrl: AlertController,
      public loadingCtrl: LoadingController,
      private afAuth: AngularFireAuth,
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    });
  }

  ngOnInit() {
  }

  loginUser() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
      this.navCtrl.navigateRoot('/home');
    }, (error) => {
      this.presentAlertLoginError(error);
    });
  }

  async presentAlertLoginError(error) {
    const alert = await this.alertCtrl.create({
      message: error.message,
      buttons: [{text: 'Ok', role: 'cancel'}]
    });

    (await alert).present();
  }

  resetPwd() {
    this.navCtrl.navigateForward('/password-reset');
  }

  createAccount() {
    this.navCtrl.navigateForward('/register');
  }
}
