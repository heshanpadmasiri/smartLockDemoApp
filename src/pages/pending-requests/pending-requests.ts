import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { User } from '../../Models/User';

/**
 * Generated class for the PendingRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending-requests',
  templateUrl: 'pending-requests.html',
})
export class PendingRequestsPage {
  request:User

  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseProvider:FirebaseProvider) {
    this.request = this.firebaseProvider.getPendingRequests();
  }

  grantAccess(){
    this.firebaseProvider.approveRequest();
  }

  ionViewDidLoad(){
    
  }

}
