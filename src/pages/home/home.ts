import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { FirebaseProvider } from '../../providers/firebase/firebase'
import { AuthProvider } from '../../providers/auth/auth'

import { AuthListner } from '../../Models/AuthListner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AuthListner{

  message;
  authenticated:Promise<Boolean>

  constructor(public navCtrl: NavController,
              public firebaseProvider: FirebaseProvider,
              private authProvider:AuthProvider) {
    this.authProvider.registerListner(this);
    this.authProvider.authenticate();
    this.message = "Awaiting authentication";
    firebaseProvider.isAttended().then(
      result=>{
        if(result){
          console.log(result);
          this.message = "true"
        } else {
          this.message = "false"
        }
      }
    )
    
  }
  

  onAuthChange(authState:boolean){
    if(authState){
      this.message = "Authenticated";
    } else {
      this.message = "Authentication failed";
    }
  }


}
