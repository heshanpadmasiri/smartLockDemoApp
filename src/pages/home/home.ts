import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase'
import { AuthProvider } from '../../providers/auth/auth'

import { AuthListner } from '../../Models/AuthListner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AuthListner{

  message:String;
  authenticated:Promise<Boolean>

  constructor(public navCtrl: NavController,
              public firebaseProvider: FirebaseProvider,
              private authProvider:AuthProvider) {
    this.authProvider.registerListner(this);
    this.authProvider.authenticate();
    this.message = "Awaiting authentication";
  }
  

  onAuthChange(authState:boolean){
    if(authState){
      this.message = "Authenticated";
    } else {
      this.message = "Authentication failed";
    }
  }


}
