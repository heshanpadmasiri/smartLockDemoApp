import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

/**
 * Generated class for the BluetoothPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
})
export class BluetoothPage {

  discoverdDevices = new Array<String>();
  pairedDevices = new Array<String>();
  message:String;
  isConnected:boolean = false;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial) {
      // Ask user to enable bluetooth
      this.message = 'no messages';
      this.bluetoothSerial.enable()
        .then((result)=>{})
        .catch((error)=>{});
  }

  ionViewDidLoad() {        
    this.bluetoothSerial.discoverUnpaired()
      .then((devices)=>{
        devices.forEach(device => {
          let bluetoothDevice = <BluetoothDevice> device;
          this.discoverdDevices.push(bluetoothDevice.name+':'+bluetoothDevice.address);
        });
      });
    this.bluetoothSerial.list()
      .then((devices) => {
        devices.forEach(device => {
          let bluetoothDevice = <BluetoothDevice> device;
          this.pairedDevices.push(bluetoothDevice.name + ':' + bluetoothDevice.address)
        })
      })
  }

  onBtnConnectClick(){
    this.bluetoothSerial.connectInsecure('00:21:13:00:3D:68')
      .subscribe(
        success=> this.onConnectionSuccess(),
        error => this.message = 'Connection Error',
        () => this.message='completed'
      );
  }

  onConnectionSuccess(){
    this.message = 'Connected Successfully'
  }
 

}

interface BluetoothDevice {
  class:number,
  id:string,
  address:string,
  name:string
}
