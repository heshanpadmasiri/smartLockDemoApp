import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FCM } from '@ionic-native/fcm';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { UsersPage} from "../pages/users/users";
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { GrantAccessPage } from '../pages/grant-access/grant-access'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private fcm: FCM) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Users', component:UsersPage},
      { title: 'List', component: ListPage },
      { title: 'Bluetooth', component:BluetoothPage},
      { title: 'Grant Access', component:GrantAccessPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.fcm.subscribeToTopic('all');
      this.fcm.getToken().then(token => {
        // backend.registerToken(token);
      });
      this.fcm.onNotification().subscribe(data => {
        alert('message received')
        if(data.wasTapped) {
        console.info("Received in background");
        } else {
        console.info("Received in foreground");
        };
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        // backend.registerToken(token);
      });


      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
