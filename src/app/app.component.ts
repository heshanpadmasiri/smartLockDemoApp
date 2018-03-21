import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FCM } from '@ionic-native/fcm';

import { FirebaseProvider } from '../providers/firebase/firebase'

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { UsersPage} from "../pages/users/users";
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { GrantAccessPage } from '../pages/grant-access/grant-access';
import { PendingRequestsPage} from '../pages/pending-requests/pending-requests'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen, 
      private fcm: FCM, 
      private fireBaseProvider:FirebaseProvider,
      private alertController:AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Users', component:UsersPage},
      { title: 'List', component: ListPage },
      { title: 'Bluetooth', component:BluetoothPage},
      { title: 'Grant Access', component:GrantAccessPage},
      { title: 'Pending Requests ', component:PendingRequestsPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(this.platform.is('cordova')){
        this.fcm.subscribeToTopic('all');
        this.fcm.getToken().then(token => {
          this.fireBaseProvider.saveFCMtoken(token);} ,
        error => this.fireBaseProvider.saveFCMtoken(error));
        this.fcm.onNotification().subscribe(data => {
          let temp = JSON.stringify(data)
          // Todo: Change this to a proper alert message
          alert('message received')
          if(data.wasTapped) {
          console.info("Received in background");
          } else {
          console.info("Received in foreground");
          };
        });
        this.fcm.onTokenRefresh().subscribe(token => {
          this.fireBaseProvider.saveFCMtoken(token);} ,
        error => this.fireBaseProvider.saveFCMtoken(error));

      }
      

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
