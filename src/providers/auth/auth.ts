import { Injectable } from '@angular/core';

import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private androidFingerprintAuth: AndroidFingerprintAuth) {
    console.log('Hello AuthProvider Provider');
  }

  authenticate():boolean{
    this.androidFingerprintAuth.isAvailable()
      .then((result)=> {
        if(result.isAvailable){
          // it is available

          this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
            .then(result => {
              if (result.withFingerprint) {
                console.log('Successfully encrypted credentials.');
                console.log('Encrypted credentials: ' + result.token);
                return true;
              } else if (result.withBackup) {
                console.log('Successfully authenticated with backup password!');
                return false;
              } else console.log('Didn\'t authenticate!');
            })
            .catch(error => {
              if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                console.log('Fingerprint authentication cancelled');
                return false;
              } else {
                console.error(error);
                return false;
              }
            });

        } else {
          // fingerprint auth isn't available
          console.log('finger print is not available')
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
      return false;
  }

}
