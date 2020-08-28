import { Injectable } from '@angular/core';
import { formatDate} from "@angular/common";
import { Cliente } from '../clientes/cliente';
import { Observable, of, throwError } from "rxjs"; //throwError no sirve para capturar las excepciones generadas por el  status HTTP
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators"; //catchError, es para obtener los errores y el status HTTP


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlEndpoint: string = 'http://localhost:8080/api/';
  httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient) {

  }

  // getClientes(): Observable<Cliente[]> {
  //   return of(listadoClientes);
  // }

  getClientes(pagina: string): Observable<Cliente[]> {
    return this.http.get(this.urlEndpoint + 'clientes/pagina/'+pagina).pipe(
      map((dato: any) => {        
        let cliente = dato.content as Cliente[];
        let respuesta: any= {} ;

         cliente.map(valor => {
          console.log("nombre_cliente", valor.nombre);
          valor.nombre = valor.nombre.toUpperCase();
          valor.apellido = valor.apellido.toUpperCase();
          // valor.fechaCreacion = formatDate(valor.fechaCreacion, 'dd/MM/yyyy', 'en-US');
          // valor.fechaCreacion = formatDate(valor.fechaCreacion, 'EEEE dd, MMMM yyyy', 'es-US');
          return valor;
        });

        respuesta = {
          "cliente": cliente,
          "paginacion": dato
        };
        
        return respuesta;


      }),
      catchError( ex => {
        console.log("mensaje de error en el service -> ", ex);
        ex.error.mensaje;          
        return throwError(ex);
      })
    )
  }

  /**Otra manera de hacerlo es no debolviendo un observable de tipo any, si no trabajando el objeto con map ....  */
  CrearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<any>(this.urlEndpoint + 'guardarCliente', cliente, { headers: this.httpHeaders }).pipe(
      map((data: any) => {    
        console.log("despues de crear", data);    
        let cliente = data.resultado as Cliente;
        return cliente;
      }),
      catchError( ex => {
        console.log("mensaje de error en el service -> ", ex);
        ex.error.mensaje;          
        return throwError(ex);
      })
    )
  }

  //traer cliente por ID y valida que no haya error
  traerClienteId(id: string): Observable<any> {
    return this.http.get<any>(this.urlEndpoint + 'buscarCliente/' + id).pipe(
      map((data) => {
        // let cliente = data as Cliente;
        return data;
      }),
      catchError( ex => {
        console.log("mensaje de error en el service -> ", ex);
        ex.error.mensaje;          
        return throwError(ex);
      })
    )
  }



  actualizarCliente(cliente: Cliente): Observable<any> {
    return this.http.put<any>(this.urlEndpoint + 'actualizarCliente', cliente, { headers: this.httpHeaders })
      .pipe(
        map(data => {
          
          // let cliente = data as Cliente;
          return data;
        }),
        catchError( ex => {
          console.log("mensaje de error en el service -> ", ex);
          ex.error.mensaje;          
          return throwError(ex);
        })
      );
  }

  eliminarCliente(cliente: Cliente): Observable<any>{
    return this.http.delete(this.urlEndpoint+ 'eliminarCliente/'+ cliente.id,{headers: this.httpHeaders})
    .pipe(
      map(data =>{
        // let cliente = data as Cliente;

        return data;
      }),
      catchError( ex => {
        console.log("mensaje de error en el service -> ", ex);
        ex.error.mensaje;          
        return throwError(ex);
      })
    );
  }


  subirFoto(foto: File,id: string): Observable<any>{
    let formData = new FormData(); //para el manejo de archivos y enctype/multipart
    formData.append("archivo",foto);
    formData.append("id",id);
    return this.http.post(this.urlEndpoint+'subirFoto/',formData).pipe(
      map(response =>{
        return response;
      }),
      catchError( ex => {
        console.log("mensaje de error en el service -> ", ex);
        ex.error.mensaje;          
        return throwError(ex);
      })
    );


  }
}
