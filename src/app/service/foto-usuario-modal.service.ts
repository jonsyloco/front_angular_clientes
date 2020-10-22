import { Injectable } from '@angular/core';

/**Clase servicio dedicada al manejo del modal para la foto de usuario */

@Injectable({
  providedIn: 'root'
})
export class FotoUsuarioModalService {

  modal: boolean;
  constructor() {
    this.modal = false;
  }

  abrirModal(){
    this.modal = true;
  }
  
  cerraModal(){
    this.modal = false;
  }
}
