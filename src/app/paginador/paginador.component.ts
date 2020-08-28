import { Component, OnInit, Input, OnChanges,  SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit, OnChanges {

  @Input() reciboPaginador: any;
  cantidadPaginas: number[];
  desde: number;
  hasta: number;



  constructor() {
  }

  ngOnInit(): void {

    console.log("datos para el paginador", this.reciboPaginador);
    this.calcularRangos();

  }

  /**
   * cuando cambia (reciboPaginador) que es el dato que le inyecta el padre entonces es necesario que cambie el componente
   * esto es por el ciclo de vida del componente
   */
  ngOnChanges(cambios: SimpleChanges): void {

    console.log("datos para el paginador", this.reciboPaginador);
    this.calcularRangos();
    

  }

  calcularRangos(): void {
    // que parte mas enredada esto de los rangos :(
    this.desde = Math.min(Math.max(1, this.reciboPaginador['paginacion'].number - 4), this.reciboPaginador['paginacion'].totalPages - 5);
    this.hasta = Math.max(Math.min(this.reciboPaginador['paginacion'].totalPages, this.reciboPaginador['paginacion'].number + 4), 6);

    if (this.reciboPaginador['paginacion'].totalPages > 5) { //aqui es la parye enrredada del calculo dinamico de randos 

      console.log("desde", this.desde);
      console.log("hasta", this.hasta);

      this.cantidadPaginas = new Array(this.hasta - this.desde + 1)
        .fill(0)
        .map((value, index) => {
          return index + this.desde;
        });

    } else {
      let totalPaginas: number = this.reciboPaginador['paginacion'].totalPages;
      this.cantidadPaginas = new Array(totalPaginas)
        .fill(0)
        .map((value, index) => {
          return index + 1;
        });


    }

  }
}

