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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial) {
  }

  ionViewDidLoad() {
    
    this.bluetoothSerial.discoverUnpaired()
      .then((devices)=>{
        devices.forEach(device => {
          this.discoverdDevices.push(device.name);
        });
      })
  }
}

interface BluetoothDevice {
  class:number,
  id:string,
  address:string,
  name:string
}