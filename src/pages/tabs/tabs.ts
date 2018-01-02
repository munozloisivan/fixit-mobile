import { Component } from '@angular/core';

import {MapaPage} from "../mapa/mapa";
import {AvisosPage} from "../avisos/avisos";
import {PerfilPage} from "../perfil/perfil";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PerfilPage;
  tab2Root = MapaPage;
  tab3Root = AvisosPage;

  constructor() {

  }
}
