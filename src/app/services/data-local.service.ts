import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage,
    public toastCtrl: ToastController) {
    this.init();
    this.cargarFavoritos();
   }

  async init() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }


  guardarPelicula(pelicula: PeliculaDetalle) {

    let existe = false;
    let mensaje = '';

    // otra forma de hacer esto es con this.peliculas.find

    for( const peli of this.peliculas){
      if (peli.id === pelicula.id){
        existe=true;
        break;
      }
    }

    if ( existe ) {
        this.peliculas=this.peliculas.filter(peli => peli.id !== pelicula.id);
        mensaje = 'Película eliminada de Favoritos';
    } else {
        this.peliculas.push( pelicula );
        mensaje ='Película agregada a Favoritos';
    }

    this.storage.set('peliculas', this.peliculas);
    this.presentToast(mensaje);

    return !existe;

  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula( id) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);
    return (existe) ? true : false;
  }
}
