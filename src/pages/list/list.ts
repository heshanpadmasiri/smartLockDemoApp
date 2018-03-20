import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { User } from '../../Models/User';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  request:User

  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseProvider:FirebaseProvider) {
    
  }

  grantAccess(){
    this.firebaseProvider.approveRequest();
  }
    
}
