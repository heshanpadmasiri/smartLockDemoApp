import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase'
import { User } from '../../Models/User';



/**
 * Generated class for the GrantAccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grant-access',
  templateUrl: 'grant-access.html',
})
export class GrantAccessPage {

  users:Array<User>

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider:FirebaseProvider, public alertCtrl: AlertController) {
    this.users = firebaseProvider.getUsers();
    console.log(this.users);
  }

  grantAccess(user:User){
    this.firebaseProvider.grantTemperoryAccess(user).then(
      sucess => {
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Successfully granted temperory access to ' + user.name,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrantAccessPage');
  }

}
