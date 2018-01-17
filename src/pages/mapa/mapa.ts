import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              private googleMaps: GoogleMaps,
              private avisoRest: AvisoProvider) {
  }

  ionViewDidLoad(){
    this.getPositions();
    this.loadMap();
  }

  loadMap(){

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
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
        /*this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });*/
        this.markers.forEach(marker=>{
          this.addMarker(marker);
        });
      })
      .catch(error =>{
        console.log(error);
      });

    //Para los demás markers


  }

  getPosition(): void{
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
        this.map.addMarker({
          title: 'My Position',
          icon: 'blue',
          animation: 'DROP',
          position: response.latLng
        });
      })
      .catch(error =>{
        console.log(error);
      });
  }

  addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title
    };
    this.map.addMarker(markerOptions);
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
        title: aviso.categoria['tipo']
      }))
    }, (err) => {
      console.log(err);
    });
  }

}

/*
* this.markers.push({
        position:{
          latitude: this.avisos.localizacion['lat'],
          longitude: this.avisos.localizacion['lon'],
        },
        title: this.avisos.categoria['tipo']
      }))
* */

/*
* console.log(aviso.localizacion['lon']))
*
* */
