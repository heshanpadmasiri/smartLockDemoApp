import { Injectable } from '@angular/core';

import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { AuthListner } from '../../Models/AuthListner';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  authListners = new Array<AuthListner>();

  constructor(private androidFingerprintAuth: AndroidFingerprintAuth) {
    console.log('Hello AuthProvider Provider');
    
  }

  registerListner(listner:AuthListner){
    this.authListners.push(listner);
  }

  updateListners(state:boolean){
    this.authListners.forEach(listner => {
      listner.onAuthChange(state);
    });
  }

  authenticate(){    
    this.androidFingerprintAuth.isAvailable()
      .then((result)=> {
        if(result.isAvailable){          // it is available

          this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
            .then(result => {
              if (result.withFingerprint) {
                console.log('Successfully encrypted credentials.');
                console.log('Encrypted credentials: ' + result.token);
                this.updateListners(true);
                return;
              } else if (result.withBackup) {
                console.log('Successfully authenticated with backup password!');
              } else console.log('Didn\'t authenticate!');
            })
            .catch(error => {
              if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                console.log('Fingerprint authentication cancelled');
              } else {
                console.error(error);
              }
            });

        } else {
          // fingerprint auth isn't available
          console.log('finger print is not available')
        }
      })
      .catch((error) => {
        console.error(error);
      });
      this.updateListners(false);
  }

}
