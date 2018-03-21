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
  id:string = '1'; // change this for different users
  defaultId:string = '1';
  appToken:any;
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
          var newUser = new User(temp.name,temp.access_level,temp.img,temp.userId);
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
    await this.firestore.collection('users').ref.get().then(snapShot => {
      snapShot.forEach(doc => {
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

  async grantTemperoryAccess(other:User){
    let access_level:string;
    await this.firestore.collection('users').ref.get().then(snapShot => {
      snapShot.forEach(doc =>{
        let temp = doc.data();
        if (temp.userId == this.id){
          access_level = temp.access_level;
        }
      })
    });
    this.firestore.collection('users').ref.get().then(snapShot => {
      snapShot.forEach(doc =>{
        let temp = doc.data();
        if (temp.userId == other.id){
          let data = {
            temp_access:access_level
          }
          doc.ref.update(data);
        }
      })
    });
  }

  saveFCMtoken(token){
    this.appToken = token;
    this.firestore.collection('users').ref.get().then(snapShot => {
      snapShot.forEach(doc =>{
        let temp = doc.data();
        if (temp.userId == this.id){
          let data = {
            token:token
          }
          doc.ref.update(data);
        }
      })
    });
  }

  async isAttended(){
    await this.updateAttendace();
    return this.attendent;
  }

  async requestAccess(){
    await this.firestore.collection('users').ref.get().then(snapShot => {
      snapShot.forEach(doc => {
        if(doc.data().userId == this.defaultId){
          let data = {
            reqToken:this.appToken,
            approved:false,
            from:'user2'
          }
          doc.ref.update(data);
        }
      })
    });
  }

  async getPendingRequestName(){
    this.firestore.collection('users').doc(this.id).ref.get()
      .then(
      doc => {
        if (!doc.data().approved){
          return doc.data().name;
        } else {
          return null;
        }
      }
    )
      .catch(
        err => {
          return null;
        }
      )
  }


  async getPendingRequests():Promise<any>{
    let pendingUser:User;
    // get the name of the pending user
    this.getPendingRequestName().then(
      name =>{
        if (name != null){
          // we have an pending request from the name
          this.firestore.collection('users').ref.get()
            .then(
            snapShot => {
              snapShot.forEach( doc => {
                if (doc.data().name == name){
                  let temp = doc.data();
                  pendingUser = new User(temp.name,temp.access_level,temp.img,temp.id);
                }
              })
            }
          )
        }
      }
    ).then(() => {
        return pendingUser;
    });
  }

  async getDoorKey(mac:string){
    let access_level:string = 'outSider';
    await this.firestore.collection('users').ref.get().then(snapShot => {
      snapShot.forEach(doc => {
        if(doc.data().userId == this.id){
          if(doc.data().outSider !== true){
            access_level = doc.data().access_level;
          }
        }
      })
    });
    if (access_level !== 'outSider'){
      await this.firestore.collection('doors').ref.get().then(snapShot => {
        snapShot.forEach(doc => {
          let temp = doc.data();
          if (temp.mac == mac && temp.access_level == access_level){
            this.doorKey = temp.auth_key;
          }
        })
      });
      return this.doorKey;
    } else {
      return access_level;
    }

  }

  approveRequest(){
    this.firestore.collection('users').ref.get().then(snapShot => {
      snapShot.forEach(doc => {
        if(doc.data().userId == this.id){
          let data = {
            approved:true
          };
          doc.data().ref().update(data);
        }
      })
    });
  }

}

