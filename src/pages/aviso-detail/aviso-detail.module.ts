import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvisoDetailPage } from './aviso-detail';

@NgModule({
  declarations: [
    AvisoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AvisoDetailPage),
  ],
})
export class AvisoDetailPageModule {}
