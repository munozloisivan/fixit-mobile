import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AvisoProvider } from "../../providers/aviso/aviso";
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
/**
 * Generated class for the AvisoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aviso-detail',
  templateUrl: 'aviso-detail.html',
})
export class AvisoDetailPage {

  avisoIdentifier: any;
  aviso: any;

  codPostal: any;
  calle: any;
  ciudad: any;
  longitud: any;
  latitud: any;

  site: GoogleMap;
  marker : any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private avisRest: AvisoProvider,
              private googleMaps: GoogleMaps) {

    this.avisoIdentifier = navParams.get("avID");
    this.aviso = {}

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvisoDetailPage');
    console.log('aviso id: ' + this.avisoIdentifier);
    this.getAvDetails(this.avisoIdentifier);
    this.loadMap();
  }


  getAvDetails(av) {
    this.avisRest.showAviso(av).then((res) => {
      //console.log('Usuario:' + JSON.stringify(res));
      //console.log('res a pelo: ' + res);
      this.aviso = res;
      console.log(this.aviso);
      this.calle = this.aviso.datosUbicacion['calle'];
      this.codPostal = this.aviso.datosUbicacion['codPostal'];
      this.ciudad = this.aviso.datosUbicacion['ciudad'];
      this.longitud = this.aviso.localizacion['lon'];
      this.latitud = this.aviso.localizacion['lat'];
      console.log(this.calle + this.codPostal + this.longitud);
    }, (err) => {
      console.log(err);
    });
  }

  loadMap(){

    let mapOptions2: GoogleMapOptions = {
      camera: {
        target: {
          lat: 2, // default location
          lng: 41.2132 // default location
        },
        zoom: 10,
        tilt: 30
      }
    };

    this.site = this.googleMaps.create('fixer', mapOptions2);

    // Wait the MAP_READY before using any methods.
    this.site.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('map ready!');
        // Now you can use all methods safely.
        //this.getPosition();
        this.getPosition();
        this.marker = {
          position:{
            latitude: this.latitud,
            longitude: this.longitud,
          },
          title:'Aviso'
        };
        this.addMarker();
      })
      .catch(error =>{
        console.log(error);
      });
  }

  addMarker(){
    let markerOptions2: MarkerOptions = {
      position: new LatLng(this.marker.position.latitude, this.marker.position.longitude),
      title: this.marker.title
    };
    this.site.addMarker(markerOptions2);
  }

  getPosition(): void{

    this.site.getMyLocation()
      .then(response => {
        this.site.moveCamera({
          target: response.latLng
        });
        this.site.addMarker({
          title: 'Yo',
          icon: 'blue',
          animation: 'DROP',
          position: response.latLng
        });
      })
      .catch(error =>{
        console.log(error);
      });
  }

}
