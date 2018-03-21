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
    this.updatePending();
  }

  async updatePending(){
    console.log('updating pending');
    this.firebaseProvider.getPendingRequests().then(
      pendingRequest => {
        if (pendingRequest != undefined || pendingRequest != null){
          this.request = <User>pendingRequest;
          this.pending = true;
        } else {
          this.pending = false;
        }
      }
    );
  }

  async grantAccess(){
    this.firebaseProvider.approveRequest().then(
      (result)=>{
        this.updatePending();
      }
    );
  }

  ionViewDidLoad(){

  }

}
