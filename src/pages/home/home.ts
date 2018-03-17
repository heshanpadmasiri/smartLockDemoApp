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

  message:string;
  authenticated:boolean=false;  
  mac:string='00:21:13:00:3D:68';

  constructor(public navCtrl: NavController,
              public firebaseProvider: FirebaseProvider,
              private authProvider:AuthProvider,
              private bluetoothSerial:BluetoothSerial) {
    this.authProvider.registerListner(this);    
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
    this.initiateConnection();      
  }
  
  initiateConnection(){
    this.bluetoothSerial.connectInsecure(this.mac)
      .subscribe(
        success=> this.onConnectionSuccess(),
        error => this.message = error,
        () => this.message='completed'
      );
  }

  onConnectionSuccess(){
    this.firebaseProvider.isAttended().then(
      result => {
        if (result){
          this.initiateHandshake()
        } else {
          this.authProvider.authenticate();
        }
      }
    )
  }

  initiateHandshake(){
    this.firebaseProvider.getDoorKey(this.mac).then(
      key => {
        if (key !== ''){
          this.writeBluetooth(key);
        } else {
          this.message = key + "invalid key"
        }
      }
    )
    this.bluetoothSerial.subscribe('\n').subscribe(
      res =>{
        
        if (res.indexOf('Y') > -1){
          this.message = 'disconnecting'          
          this.bluetoothSerial.disconnect()
        } else {
          this.message += "refuse to open:" + res + '--';
        }
      },
      error => this.message = "error:" + error,
      () => this.message = 'finished reading'
    )
  }

  writeBluetooth(message:string){
    this.bluetoothSerial.write(message).then(
      success => this.message = 'successfully written: ' + message,
      error => this.message = "writing failed due to " +error
    )
  }

  onAuthChange(authState:boolean){
    if(authState){
      this.authenticated = true
      this.initiateHandshake();
    } else {
      this.authenticated = false;
    }
  }
}
