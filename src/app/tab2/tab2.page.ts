import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Spiderman','Superman','El señor de los anillos','La vida es bella'];

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
    ) {}

  buscar( event) {
    this.buscando = true;
    const valor: string = event.detail.value;

    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    this.moviesService.buscarPelicula(valor).subscribe(resp => {
      console.log(resp);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.peliculas=resp['results'];
      this.buscando = false;
    });

  }

  async verDetalle(id: string){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
