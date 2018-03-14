import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  firestore:AngularFirestore;

  constructor(public fs: AngularFirestore) {
    this.firestore = fs;
  }

  getNames(){
    let temp = this.firestore.collection('users');
    console.log(temp);
  }

}
