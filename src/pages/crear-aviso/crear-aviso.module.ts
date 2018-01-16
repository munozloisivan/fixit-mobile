import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearAvisoPage } from './crear-aviso';

@NgModule({
  declarations: [
    CrearAvisoPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearAvisoPage),
  ],
})
export class CrearAvisoPageModule {}
