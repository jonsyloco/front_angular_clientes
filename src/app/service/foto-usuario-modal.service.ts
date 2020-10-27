import { EventEmitter, Injectable } from '@angular/core';


/**Clase servicio dedicada al manejo del modal para la foto de usuario */

@Injectable({
  providedIn: 'root'
})
export class FotoUsuarioModalService {

  modal: boolean;

  private _notificarSubirArchivo = new EventEmitter<any>();



  constructor() {
    this.modal = false;
  }

  get notificarSubirArchivo(): EventEmitter<any> {
    return this._notificarSubirArchivo;
  }


  abrirModal() {
    this.modal = true;
  }

  cerraModal() {
    this.modal = false;
  }
}
