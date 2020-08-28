import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../service/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

import swal from "sweetalert2";

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {

  titulo: string = 'Crear Clientes';
  cliente: Cliente;
  btnNombre: string = 'Crear';
  erroresBack: string[] = [];
  maxDate: Date = new Date();


  constructor(private clienteService: ClienteService,
    private rutas: Router,
    private activateRoute: ActivatedRoute) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    
    this.cargarCliente(); // detecta un parametro en la URL y lo carga en al interfaz

  }

  crearCliente(): void {
    
    if(this.cliente.id){ /**actualizar cliente */   
      this.actualizarCliente(this.cliente);
      return;      
    }

    this.clienteService.CrearCliente(this.cliente).subscribe(
      response => {
        console.log("respuesta del servicio de creado de cliente", response);
        swal('Cliente creado!', 'El cliente ' + response.nombre + ' creado con éxito!', 'success');
        //despues de guardar, redirigimos al listado de clientes
        this.rutas.navigate(['/clientes']);
      },
      error => {
        
        if(error.status == 400){ // si el error proviene de un BAD_REQUEST desde el back, es porque son validaciones de campos
          console.log("error de campos", error);
          this.erroresBack = error.error.resultado;
          
          return;

        }





        console.log(error);        
        swal('Error!', error.error.mensaje, 'error'); //respueta desde el back
        return;
      }

    );
  }


  /**trae el cliente directamente del endPoint*/
  traerClientePorId(id: string): void {
    this.clienteService.traerClienteId(id).subscribe(
      response => {
        console.log("cliente encontrado->", response);
        this.cliente = response;
      },
      error => {
        console.log(error);        
        swal('Error!', error.error.mensaje, 'error'); //respueta desde el back
        this.rutas.navigate(["/clientes"]);
      });

  }

  /**verifica segun la URL el id del cliente que se va a mandar a llamar
   * al endPoint
   */
  cargarCliente(): void {
    this.activateRoute.params.subscribe(parametrosUrl => {
      let id: string = parametrosUrl['id'];
      if (id) { //si el ID existe
        this.traerClientePorId(id);
      }

    }
    );
  }


  actualizarCliente(cliente: Cliente): void{
    this.clienteService.actualizarCliente(cliente)
    .subscribe(
      response => {
        console.log("cliente actualizado",response);
        swal('Cliente actualizado', 'cliente ' + response.resultado.nombre + ' Actualizado con éxito!', 'success');
        //despues de guardar, redirigimos al listado de clientes
        this.rutas.navigate(['/clientes']);
                
      },
      error => {
        
        
        if(error.status == 400){ // si el error proviene de un BAD_REQUEST desde el back, es porque son validaciones de campos
          console.log("error de campos", error);
          this.erroresBack = error.error.resultado;
          
          return;

        }

        console.log(error);        
        swal('Error!', error.error.mensaje, 'error'); //respueta desde el back
        return;
      }
    );

  }

}
