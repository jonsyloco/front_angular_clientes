import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../service/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from "sweetalert2";
import { error } from 'protractor';


@Component({
  selector: 'app-foto-usuario',
  templateUrl: './foto-usuario.component.html',
  styleUrls: ['./foto-usuario.component.css']
})
export class FotoUsuarioComponent implements OnInit {

  cliente: Cliente;
  titulo: string;
  imagenSeleccionada: File;
  foto: string;

  constructor(private servicio: ClienteService,
    private rutas: Router,
    private activateRoute: ActivatedRoute) {
    this.titulo = 'Foto del cliente';
    this.cliente = new Cliente();
    this.foto = '';
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(parametrosUrl => {
      let id: string = parametrosUrl['id'];
      if (id) { //si el ID existe
        this.traerClientePorId(id);
      }

    }
    );
  }


  /**trae el cliente directamente del endPoint*/
  traerClientePorId(id: string): void {
    this.servicio.traerClienteId(id).subscribe(
      response => {
        console.log("cliente encontrado->", response);
        this.cliente = response;
        if (this.cliente.rutaFoto != null && this.cliente.rutaFoto != '' && this.cliente.rutaFoto != undefined) {
          let auxiliar = this.cliente.rutaFoto.split(".");

          let rutaFotoAux = auxiliar[0].split("\\");
          console.log("ruta de foto", rutaFotoAux);

          this.foto = rutaFotoAux[6];


        }
      },
      error => {
        console.log(error);
        swal('Error!', error.error.mensaje, 'error'); //respueta desde el back
        this.rutas.navigate(["/clientes"]);
      });

  }


  fotoSeleccioanda(event): void {
    this.imagenSeleccionada = event.target.files[0];
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
        console.log("respuesta servicio ", response.mensaje);

        swal('Exito!', response.mensaje, 'success'); //respueta desde el back
      },
      error => {
        console.log(error);
        swal('Error!', error.error.mensaje, 'error'); //respueta desde el back
        // this.rutas.navigate(["/clientes"]);
      });

  }

}
