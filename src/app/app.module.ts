import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import {PerfilPage} from "../pages/perfil/perfil";
import {MapaPage} from "../pages/mapa/mapa";
import {AvisosPage} from "../pages/avisos/avisos";
import { WelcomePage } from "../pages/welcome/welcome";
import { LoginPage } from "../pages/login/login";
import { RegistroPage } from "../pages/registro/registro";
import { EditPerfilPage} from "../pages/edit-perfil/edit-perfil";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { GestorProvider } from '../providers/gestor/gestor';
import { CategoriaProvider } from '../providers/categoria/categoria';
import { ContactoProvider } from '../providers/contacto/contacto';
import { AvisoProvider } from '../providers/aviso/aviso';
import { LogroProvider } from '../providers/logro/logro';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import { GoogleMaps} from "@ionic-native/google-maps";


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AvisosPage,
    MapaPage,
    PerfilPage,
    WelcomePage,
    RegistroPage,
    LoginPage,
    EditPerfilPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {  scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AvisosPage,
    MapaPage,
    PerfilPage,
    WelcomePage,
    RegistroPage,
    LoginPage,
    EditPerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    GestorProvider,
    CategoriaProvider,
    ContactoProvider,
    AvisoProvider,
    LogroProvider,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule
  ]
})
export class AppModule {}
