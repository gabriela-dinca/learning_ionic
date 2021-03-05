import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NavController} from '@ionic/angular';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {
  public signupForm: FormGroup;

  constructor( public navCtrl: NavController, public formBuilder: FormBuilder ) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      passwordRepeat: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]'), Validators.required])]
    });
  }

  ngOnInit() {
  }

  signupUser() {

  }
}
