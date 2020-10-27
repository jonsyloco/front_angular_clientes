import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../service/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from "sweetalert2";
import { error } from 'protractor';
import { HttpEventType } from '@angular/common/http';
import { FotoUsuarioModalService } from '../service/foto-usuario-modal.service';
import { HelperService } from '../service/helper.service';


@Component({
  selector: 'app-foto-usuario',
  templateUrl: './foto-usuario.component.html',
  styleUrls: ['./foto-usuario.component.css']
})
export class FotoUsuarioComponent implements OnInit {

  @Input() cliente: Cliente;
  titulo: string;
  imagenSeleccionada: File;
  foto: string;
  progreso: number;
  estadoModal: boolean;

  constructor(private servicio: ClienteService,
    private rutas: Router,
    private helper: HelperService,
    public fotoModalService: FotoUsuarioModalService,
    private activateRoute: ActivatedRoute) {
    this.titulo = 'Foto del cliente';
    // this.cliente = new Cliente();
    this.foto = '';
    this.progreso = 0;
    this.estadoModal = this.fotoModalService.modal;


  }

  ngOnInit(): void {
    console.log("cliente", this.cliente);
    // this.traerCliente();
    // this.activateRoute.params.subscribe(parametrosUrl => {
    //   let id: string = parametrosUrl['id'];
    //   if (id) { //si el ID existe
    //     this.traerClientePorId(id);
    //   }

    // }
    // );
  }


  /**trae el cliente directamente del endPoint*/
  traerClientePorId(id: string): void {
    this.servicio.traerClienteId(id).subscribe(
      response => {
        console.log("cliente encontrado->", response);
        this.cliente = response;
        if (this.cliente.rutaFoto != null && this.cliente.rutaFoto != '' && this.cliente.rutaFoto != undefined) {
          // let auxiliar = this.cliente.rutaFoto.split(".jpg");
          // //.join(",").split(".png").join(",").split(".jpeg");

          // console.log("la ruta original", auxiliar);
          // let rutaFotoAux = auxiliar[0].split("\\");
          // console.log("ruta de foto", rutaFotoAux);

          // this.foto = rutaFotoAux[6];
          // console.log("la foto", this.foto);
          this.foto = this.helper.obtenerRutaFoto(this.cliente);



        } else {
          this.foto = '';
        }
      },
      error => {
        console.log(error);
        swal('Error!', error.error.mensaje, 'error'); //respueta desde el back
        this.rutas.navigate(["/clientes"]);
      });

  }

  traerCliente(): void {
    console.log("cliente->", this.cliente);


    // if (this.cliente.rutaFoto != null && this.cliente.rutaFoto != '' && this.cliente.rutaFoto != undefined) {
    //   let auxiliar = this.cliente.rutaFoto.split(".jpg");
    //   //.join(",").split(".png").join(",").split(".jpeg");

    //   console.log("la ruta original", auxiliar);
    //   let rutaFotoAux = auxiliar[0].split("\\");
    //   console.log("ruta de foto", rutaFotoAux);

    //   this.foto = rutaFotoAux[6];
    //   console.log("la foto", this.foto);



    // }
    this.foto = this.helper.obtenerRutaFoto(this.cliente);
  }


  fotoSeleccioanda(event): void {
    this.imagenSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log("foto seleccionada", this.imagenSeleccionada);
    if (this.imagenSeleccionada.type.indexOf('image')) {
      swal('Error!', "Los formatos admitidos son JPG, PNG, JPEG", "error");
      this.imagenSeleccionada = null;
      return;

    }

  }

  guardarFoto(): void {
    if (this.imagenSeleccionada == undefined || this.fotoSeleccioanda == null) {
      swal('Error!', "Debe seleccionar una foto", "error");
      return;
    } else {

    }


    this.servicio.subirFoto(this.imagenSeleccionada, this.cliente.id).subscribe(
      response => {
        console.log("respuesta servicio ", response.type);

        if (response.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round(100 * response.loaded / response.total); //se calcula el porcentaje de subido
          console.log("respuesta del servicio->", response);

        }
        if (response.type === HttpEventType.Response) {
          swal('Exito!', response.body['mensaje'], 'success'); //respueta desde el back

          /* colocando la foto en la variable global foto */
          this.cliente.rutaFoto = response.body['resultado']['rutaFoto'];
          let auxiliar = this.cliente.rutaFoto.split(".jpg");          

          console.log("la ruta original", auxiliar);
          let rutaFotoAux = auxiliar[0].split("\\");
          console.log("ruta de foto", rutaFotoAux);

          this.foto = rutaFotoAux[6];
          console.log("la foto", this.foto);
          console.log("cuerpo de la respuesta: ", response.body);

          /**eventEmitter desde el fotoUsuarioModal **/
          let cliente: Cliente = response.body['resultado'];
          console.log("cliente a emitir",cliente);          
          this.fotoModalService.notificarSubirArchivo.emit(cliente);


        }

      },
      error => {
        console.log(error);
        swal('Error!', error.error.mensaje, 'error'); //respueta desde el back
        // this.rutas.navigate(["/clientes"]);
      });

  }

  /**cerrando modal */
  cerrarModal(): void {
    this.fotoModalService.cerraModal();
    // this.cliente = null;
    this.progreso = 0;
    // this.foto='';
    this.estadoModal = this.fotoModalService.modal;

  }

  /**este medoto se hizo para que cuando cambie el parametro de cliente, se cargue la imagen en el div  */
  ngOnChanges(changes: SimpleChanges) {
    this.traerClientePorId(this.cliente.id);

  }


}
