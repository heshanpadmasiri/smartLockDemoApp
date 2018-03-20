import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingRequestsPage } from './pending-requests';

@NgModule({
  declarations: [
    PendingRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingRequestsPage),
  ],
})
export class PendingRequestsPageModule {}
