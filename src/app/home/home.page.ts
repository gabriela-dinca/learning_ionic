import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  taskList = [];
  taskName = '';
  userId: any;
  fireStoreTaskList: any;
  fireStoreList: any;
  @ViewChild('taskInput') taskInput;

  constructor(
      public navCtrl: NavController,
      public alertCtrl: AlertController,
      private afAuth: AngularFireAuth,
      private firestore: AngularFirestore
  ) {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(){
    setTimeout(() => {
      this.taskInput.setFocus();
    }, 350);
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.userId = user.uid;
        this.fireStoreTaskList = this.firestore.doc<any>('users/' + this.userId).collection('tasks').valueChanges();
        console.log(this.firestore.doc<any>('users/' + this.userId));
        this.fireStoreList = this.firestore.doc<any>('users/' + this.userId).collection('tasks');
      }
    });
  }

  addTask() {
    if (this.taskName.length > 0) {
      const task = this.taskName;
      const id = this.firestore.createId();
      this.fireStoreList.doc(id).set({
        id, // id: id shorthand
        taskName: task
      });
      // this.taskList.push(this.taskName);
      this.taskName = '';
    }
    this.taskInput.setFocus();
  }

  deleteTask(id: any) {
    // this.taskList.splice(i, 1);
    this.fireStoreList.doc(id).delete();
  }

  async presentUpdateAlert(id) {

    const alert = await this.alertCtrl.create({
      message: 'Type in your new task name',
      inputs: [{name: 'editTask', placeholder: 'Task'}],
      buttons: [
        { text: 'Cancel', role: 'cancel'},
        { text: 'Update', handler: data => {
            this.fireStoreList.doc(id).update({
              taskName: data.editTask
            });
            // this.taskList[id] = data.editTask;
          }
        },
      ]
    });

    (await alert).present();
  }

  updateTask(id: { taskName: any }) {
    this.presentUpdateAlert(id);
  }

  logout() {
    return this.afAuth.auth.signOut().then(() => {
      this.navCtrl.navigateRoot('/login');
    });
  }
}
