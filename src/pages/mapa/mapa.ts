import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
} from '@ionic-native/google-maps';
import { Geolocation } from "@ionic-native/geolocation";
import {AvisoProvider} from "../../providers/aviso/aviso";
import {AvisoStep1Page} from "../aviso-step1/aviso-step1";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import {AvisoDetailPage} from "../aviso-detail/aviso-detail";

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  avisos: any;

  map: GoogleMap;
  markers: any[] = [];
  identity: {};
  lat: any;
  lon: any;

  avShow : any;

  ciShow: any;
  codPostalShow: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private geolocation: Geolocation,
              private googleMaps: GoogleMaps,
              private avisoRest: AvisoProvider,
              private usuarioRest: UsuarioProvider,
              private alertCtrl: AlertController) {


  }

  ionViewDidLoad(){
    this.getPositions();
    this.loadMap();
    this.identity = JSON.parse(localStorage.getItem('identity'));
    console.log(this.identity['_id']);
  }

  ionViewWillEnter() {
    this.getPositions();
  }

  ionViewWillDissapear() {

  }

  ionViewWillLeave() {
  }
  ionViewDidDissapear() {

  }

  loadMap(){

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 15,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('map ready!');
        // Now you can use all methods safely.
        this.getPosition();

        this.markers.forEach(marker=>{
          this.addMarker(marker);
        });
      })
      .catch(error =>{
        console.log(error);
      });
  }

  getPosition(): void{
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
        this.map.addMarker({
          draggable: true,
          title: 'Mi posición',
          icon: 'blue',
          animation: 'DROP',
          position: response.latLng
        });
        this.lat = response.latLng.lat;
        this.lon = response.latLng.lng;
      })
      .catch(error =>{
        console.log(error);
      });
  }

  addMarker(options) {
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title,
      icon: options.icon,
      id: options.id
    };
    this.map.addMarker(markerOptions);
      /*.then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            //alert(options.title);

            this.avisoRest.showAviso(options.id).then((res) => {
              //console.log('Usuario:' + JSON.stringify(res));
              //console.log('res a pelo: ' + res);
              this.avShow = res;
              this.codPostalShow = this.avShow.datosUbicacion['codPostal'];
              this.ciShow = this.avShow.datosUbicacion['ciudad'];

            }, (err) => {
              console.log(err);
            });

            let alert = this.alertCtrl.create({
              title: 'Información del aviso',
              message: 'Si deseas ver los detalles del aviso también estás de acuerdo con el, clica en "Aceptar" y podrás unirte a la causa apoyandolo',
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Aceptar',
                  handler: () => {
                    console.log('Confirm clicked');
                    //Función para apoyar el aviso
                    this.navCtrl.push(AvisoDetailPage,{avID: options.id});
                  }
                }
              ]
            });
            alert.present();

          });*/
  }

  getPositions() {
    this.avisoRest.getAllAvisos().then((res) => {
      this.avisos = res;
      console.log('avisos:' +this.avisos);

      this.avisos.forEach((aviso) => this.markers.push({
        position:{
          latitude: aviso.localizacion['lat'],
          longitude: aviso.localizacion['lon'],
        },
        title:  aviso.categoria['tipo'],
        icon: 'http://147.83.7.158/assets/iconos/' +aviso.categoria.icono,
        id: aviso._id
      }))
    }, (err) => {
      console.log(err);
    });
  }

  Create() {
    this.usuarioRest.createAviso(this.identity['_id'], {"localizacion":{"lon": this.lon, "lat":this.lat}}).then((res) => {
      //console.log('Usuario:' + JSON.stringify(res));
      //console.log('res a pelo: ' + res);
      //this.usuario = res;
      console.log('aviso creado response:' +res);
      let av = res['_id'];
      console.log('id del aviso: ' + av);
      /*let alert = this.alertCtrl.create({
        title: 'Aviso ' + av ,
        subTitle: 'coordenadas ' + this.lon ,
        buttons: ['Dismiss']
      });
      alert.present();*/
      this.navCtrl.push(AvisoStep1Page, {AVISO: av} );
    }, (err) => {
      console.log(err);
    });
  }


}

