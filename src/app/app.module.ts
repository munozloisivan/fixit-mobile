import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import {PerfilPage} from "../pages/perfil/perfil";
import {MapaPage} from "../pages/mapa/mapa";
import {AvisosPage} from "../pages/avisos/avisos";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { GestorProvider } from '../providers/gestor/gestor';
import { CategoriaProvider } from '../providers/categoria/categoria';
import { ContactoProvider } from '../providers/contacto/contacto';
import { AvisoProvider } from '../providers/aviso/aviso';
import { LogroProvider } from '../providers/logro/logro';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AvisosPage,
    MapaPage,
    PerfilPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AvisosPage,
    MapaPage,
    PerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    GestorProvider,
    CategoriaProvider,
    ContactoProvider,
    AvisoProvider,
    LogroProvider
  ]
})
export class AppModule {}
