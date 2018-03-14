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
    this.firestore.collection('users').ref.get().then(snapShot =>{
      snapShot.forEach(doc => {
        console.log(doc.data());
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
}

interface User {
  auth_key:String;
  auth_level:String;
  name:String;
  tt:String;
}