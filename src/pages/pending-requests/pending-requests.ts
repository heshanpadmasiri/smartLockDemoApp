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
  request:User;
  pending:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseProvider:FirebaseProvider) {
    this.firebaseProvider.getPendingRequests().then(
      pendingRequest => {
        if (pendingRequest != undefined || pendingRequest != null){
          this.request = <User>pendingRequest;
          this.pending = true;
        }
      }
    );

  }

  grantAccess(){
    this.firebaseProvider.approveRequest();
  }

  ionViewDidLoad(){

  }

}
