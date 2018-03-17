import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrantAccessPage } from './grant-access';

@NgModule({
  declarations: [
    GrantAccessPage,
  ],
  imports: [
    IonicPageModule.forChild(GrantAccessPage),
  ],
})
export class GrantAccessPageModule {}
