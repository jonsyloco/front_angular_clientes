import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../service/cliente.service';
import swal from "sweetalert2/dist/sweetalert2.js";
import { Router, ActivatedRoute } from '@angular/router';
import { FotoUsuarioModalService } from '../service/foto-usuario-modal.service';
import { map } from 'rxjs/operators';
import { HelperService } from '../service/helper.service';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  listadoCl: Cliente[];
  pagina: string;
  paginacion: any;
  clienteSeleccionado: Cliente;



  constructor(private clienteService: ClienteService,
    private fotoModalService: FotoUsuarioModalService,
    private rutas: Router,
    private helper: HelperService,
    private activateRoute: ActivatedRoute) {
    this.pagina = '0';
    //this.clienteSeleccionado = new Cliente();
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(rutaUrl => {
      this.pagina = rutaUrl['page'];
      console.log("pagina", this.pagina);
      if (this.pagina == null || this.pagina == undefined || this.pagina == '') {
        this.pagina = '0';
      }
      this.traerClientes(this.pagina);
    });

    /**nos suscribimos a la notificacion de Emitter para saber si se ha subido una foto de perfil y poder recargar el listado */
    this.fotoModalService.notificarSubirArchivo.subscribe(clientes => {
      this.listadoCl = this.listadoCl.map(clienteOriginal_listado => {
        if (clienteOriginal_listado.id === clientes.id) { //si el id del cliente original de este listado es igual al id del cliente que se emitio en el modal service... entonces actualizamos la url de la imagen, para que se muestre en el lisatado
          clienteOriginal_listado.rutaFoto = clientes.rutaFoto;
          clienteOriginal_listado.nombreFoto = this.helper.obtenerRutaFoto(clientes);
          console.log("entre al emitter", clienteOriginal_listado);
          
        }
        console.log("salí  del emitter", clientes);
        return clienteOriginal_listado;
      });


    });

  }


  traerClientes(pagina: string): void {
    this.clienteService.getClientes(pagina).subscribe(
      (clienteService) => {
        console.log("resultado->", clienteService);
        this.paginacion = clienteService;

        this.listadoCl = clienteService['cliente'];
        console.log("datos de clientes", this.listadoCl);
      }
    )

  }



  eliminarClientes(cliente: Cliente): void {
    swal.fire({
      title: 'Eliminar Cliente',
      text: "Esta seguro de eliminar a: " + cliente.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#adb5bd',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i>'
    }).then((result) => {
      if (result.value) {
        this.borrarCliente(cliente);
        return;
      }
    })

  }

  borrarCliente(cliente: Cliente): void {
    this.clienteService.eliminarCliente(cliente)
      .subscribe(
        response => {
          console.log("respuesta despues de eliminar", response);

          swal.fire(
            'Cliente borrado con éxito!',
            'El cliente ' + cliente.nombre + ' fue borrador.',
            'success'
          );

          this.traerClientes(this.pagina);

        }
      );
  }

  abrirModal(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    console.log("cliente desde clientes.components->", this.clienteSeleccionado);
    this.fotoModalService.abrirModal();

  }


}
