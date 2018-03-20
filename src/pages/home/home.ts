import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

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
  connected:boolean=false;
  MACs:Array<string>=['00:21:13:02:84:C2','00:21:13:00:3D:68']
  index:number=0;
  mac:string;

  constructor(public navCtrl: NavController,
              public firebaseProvider: FirebaseProvider,
              private authProvider:AuthProvider,
              private bluetoothSerial:BluetoothSerial,
              private alertController:AlertController) {
    this.authProvider.registerListner(this);
    this.mac = this.MACs[this.index];
    setInterval(() => {
      this.initiateConnection();
    },10000)
    
  }
  
  initiateConnection(){
    this.message = 'initiating connection' + this.mac;
    if(this.connected || this.index>1){      
      return
    } else {      
      this.bluetoothSerial.connectInsecure(this.mac)
      .subscribe(
        success=> this.onConnectionSuccess(),
        error => {
          this.message = error },
        () => {
          this.message='completed'}
      );
      this.bluetoothSerial.subscribe('\n').subscribe(
        res =>{        
          if (res.indexOf('Y') > -1){
            this.message = 'disconnecting'          
            this.bluetoothSerial.disconnect()
            this.connected = false
            this.index += 1;
            this.mac = this.MACs[this.index];
          } else {
            this.message += "refuse to open:" + res + '--';
            this.connected = false;
          }
        },
        error => this.message = "error:" + error,
        () => this.message = 'finished reading'
      )      
    }
    
  }

  onConnectionSuccess(){    
    this.connected = true;    
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
        if (key == 'outSider'){
          let confirm = this.alertController.create({
            title: "You don't have access",
            message: 'Do you like hola to ask for access on you behalf?',
            buttons: [
              {
                text: 'Disagree',
                handler: () => {
                  console.log('Disagree clicked');
                }
              },
              {
                text: 'Agree',
                handler: () => {
                  console.log('Agree clicked');
                }
              }
            ]
          });
          confirm.present();
          this.connected = false;
          this.bluetoothSerial.disconnect();
        }
        else if (key !== ''){
          this.writeBluetooth(key);
        } else {
          this.message = key + "invalid key"
          this.connected = false
        }
      }
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
