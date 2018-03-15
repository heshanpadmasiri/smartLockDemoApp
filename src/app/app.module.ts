import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsersPage} from "../pages/users/users";
import { ListPage } from '../pages/list/list';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AuthProvider } from '../providers/auth/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAcqgf58aoclrD1zdgxasygnx7O1Uzapl4",
  authDomain: "smartdoorlock-9b19b.firebaseapp.com",
  databaseURL: "https://smartdoorlock-9b19b.firebaseio.com",
  projectId: "smartdoorlock-9b19b",
  storageBucket: "smartdoorlock-9b19b.appspot.com",
  messagingSenderId: "288496384528"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    UsersPage,
    BluetoothPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    UsersPage,
    BluetoothPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidFingerprintAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    AuthProvider
  ]
})
export class AppModule {}
