import { Injectable } from '@angular/core';
import { Cliente } from '../clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  posicionFoto: number;

  constructor() {
    this.posicionFoto = 6;
  }

  /**metodo encargado de recibir el cliente y devolver el nombre de la foto, apartir de la ruta de la foto */
  obtenerRutaFoto(cliente: Cliente): string {

    if (cliente.rutaFoto != null && cliente.rutaFoto != undefined && cliente.rutaFoto != "") {
      let auxiliar = cliente.rutaFoto.split(".jpg");
      let rutaFotoAux = auxiliar[0].split("\\");
      return rutaFotoAux[this.posicionFoto];
    }
    return '';
  }  
  
}
