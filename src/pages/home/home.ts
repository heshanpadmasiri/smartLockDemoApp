import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase'
import { AuthProvider } from '../../providers/auth/auth'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  message:String;

  constructor(public navCtrl: NavController,
              public firebaseProvider: FirebaseProvider,
              private authProvider:AuthProvider) {
    let authenticate:Promise<Boolean> = this.authProvider.authenticate();
    authenticate
      .then(result => {
        console.log(result);
        if(result){
          this.message = "Authenticated";
        } else {
          this.message = "Authentication failed"
        }
      })
      .catch(err => console.log(err));
  }

  ionViewDidLoad() {
    
  }

}
