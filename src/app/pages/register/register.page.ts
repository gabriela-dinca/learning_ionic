import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, AlertController, LoadingController} from '@ionic/angular';
import {EmailValidator} from '../../../validators/email';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
    public signupForm: FormGroup;
    // public loading: Loading;

    constructor(
        public navCtrl: NavController,
        public formBuilder: FormBuilder,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        private afAuth: AngularFireAuth,
        private firestore: AngularFirestore
    ) {
        this.signupForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            passwordRepeat: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]*'), Validators.required])],
            lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]*'), Validators.required])]
        });
    }

    ngOnInit() {
    }


    async presentAlert(error) {
        const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{text: 'Ok', role: 'cancel'}]
        });

        (await alert).present();
    }

    async presentAlertPassword() {
        const alert = this.alertCtrl.create({
            message: 'The passwords do not match.',
            buttons: [{text: 'Ok', role: 'cancel'}]
        });

        (await alert).present();
    }

    signupUser() {
        if (this.signupForm.value.password === this.signupForm.value.passwordRepeat) {
            this.afAuth.auth.createUserWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password)
                .then(() => {
                    const userId = this.afAuth.auth.currentUser.uid;
                    const userDoc = this.firestore.doc<any>('users/' + userId);
                    userDoc.set({
                        firstName: this.signupForm.value.firstName,
                        lastName: this.signupForm.value.lastName,
                        email: this.signupForm.value.email
                    });
                    this.navCtrl.navigateRoot('/home');
                }, (error) => {
                    this.presentAlert(error);
                    // this.loading.dismiss().then(() => {
                    //     this.presentAlert(error);
                    // });
                });

            /*this.loading = this.loadingCtrl.create({
                message: 'Signing up..'
            });
            */// this.loading.present();
        } else {
            this.presentAlertPassword();
        }
    }
}
