import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase'
import { AuthProvider } from '../../providers/auth/auth'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  constructor(public navCtrl: NavController,
              public firebaseProvider: FirebaseProvider,
              private authProvider:AuthProvider) {
    this.authProvider.authenticate();
  }

}
