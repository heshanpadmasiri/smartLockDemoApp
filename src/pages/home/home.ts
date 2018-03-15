import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase'
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  constructor(public navCtrl: NavController,
              public firebaseProvider: FirebaseProvider,
              private androidFingerprintAuth: AndroidFingerprintAuth) {
    this.androidFingerprintAuth.isAvailable()
      .then((result)=> {
        if(result.isAvailable){
          // it is available

          this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
            .then(result => {
              if (result.withFingerprint) {
                console.log('Successfully encrypted credentials.');
                console.log('Encrypted credentials: ' + result.token);
              } else if (result.withBackup) {
                console.log('Successfully authenticated with backup password!');
              } else console.log('Didn\'t authenticate!');
            })
            .catch(error => {
              if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                console.log('Fingerprint authentication cancelled');
              } else console.error(error)
            });

        } else {
          // fingerprint auth isn't available
          console.log('finger print is not available')
        }
      })
      .catch(error => console.error(error));

  }

}
