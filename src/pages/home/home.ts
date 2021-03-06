import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition,
        MarkerOptions, Marker} from '@ionic-native/google-maps';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  map: GoogleMap;
  mapElement: HTMLElement;
  //platform: Platform

  constructor(
    public navCtrl: NavController,
    private googleMaps: GoogleMaps,
    private platform: Platform
  ) {
    platform.ready().then(() => {
       this.loadMap();
     });
  }

  loadMap() {
    this.mapElement = document.getElementById('map');

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = this.googleMaps.create(this.mapElement, mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
  .then(() => {
    console.log('Map is ready!');

    // Now you can use all methods safely.
    this.map.addMarker({
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
      });

  });
  }


   ionViewDidLoad() {
    this.loadMap();
   }
}
