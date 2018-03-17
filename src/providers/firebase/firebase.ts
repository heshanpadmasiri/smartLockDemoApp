import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { User } from '../../Models/User'

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  id:string = '1' // change this for different users

  doorKey:string;

  firestore:AngularFirestore;

  attendent:boolean;

  constructor(public fs: AngularFirestore) {
    this.firestore = fs;
  }

  getUsers():Array<User>{
    let userArray = new Array<User>();
    this.firestore.collection('users').ref.get().then(snapShot =>{
      snapShot.forEach(doc => {
        let temp = doc.data();
        
        if (temp.userId != this.id){
          var newUser = new User(temp.name,temp.access_level,temp.img);
          console.log(temp.name);
          console.log(newUser);
          userArray.push(newUser);
        }        
      });
      //console.log(userArray);

    })
    .catch(err => {
      console.log(err);
    });
    return userArray;
  }

  async updateAttendace(){    
    await this.firestore.collection('users').ref.get().then(snapShoht => {
      snapShoht.forEach(doc => {
        let temp = doc.data();        
        if (temp.userId == this.id){          
          this.attendent = temp.current_attendance;
          if (!temp.current_attendance){
            // mark him as present
            let data = {
              current_attendance:true
            }
            doc.ref.update(data);
          }
        }        
      });      
    })     
  }



  async isAttended(){
    await this.updateAttendace();

    return this.attendent;
  }

  async getDoorKey(mac:string){
    await this.updateDoorKey(mac);    
    return this.doorKey;
  }

  async updateDoorKey(mac:string){
    await this.firestore.collection('doors').ref.get().then(snapShot => {
      snapShot.forEach(doc => {
        let temp = doc.data();
        if (temp.mac == mac){          
          this.doorKey = temp.auth_key;          
        }
      })
    })
  }
}

