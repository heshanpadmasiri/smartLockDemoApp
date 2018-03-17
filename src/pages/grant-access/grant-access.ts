import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider:FirebaseProvider) {
    this.users = firebaseProvider.getUsers();
    console.log(this.users);
  }

  grantAccess(user:User){
    this.firebaseProvider.grantTemperoryAccess(user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrantAccessPage');
  }

}
