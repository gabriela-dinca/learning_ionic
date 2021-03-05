import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, AlertController, LoadingController} from '@ionic/angular';
import {EmailValidator} from '../../validators/email';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  public resetPwdForm: FormGroup;

  constructor(
      public navCtrl: NavController,
      public formBuilder: FormBuilder,
      public alertCtrl: AlertController,
      public loadingCtrl: LoadingController,
      private afAuth: AngularFireAuth,
  ) {
    this.resetPwdForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
    });
  }

  ngOnInit() {
  }

  async presentAlertPwdResetError(error) {
    const alert = await this.alertCtrl.create({
      message: error.message,
      buttons: [{text: 'Ok', role: 'cancel'}]
    });

    (await alert).present();
  }

  async presentAlertPwdSuccess() {
    const alert = await this.alertCtrl.create({
      message: 'We just sent a link to reset your password to your email.',
      buttons: [{ text: 'Ok', role: 'cancel',
        handler: () => {
          this.navCtrl.pop();
        }}]
    });

    (await alert).present();
  }

  resetPassword() {
    this.afAuth.auth.sendPasswordResetEmail(this.resetPwdForm.value.email).then(() => {
      this.presentAlertPwdSuccess();
    }, (error) => {
      this.presentAlertPwdResetError(error);
    });
  }
}
