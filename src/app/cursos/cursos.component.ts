import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  curso: string[] = ['Angular', 'Springboot', 'TypeScript', 'PHP'];
  habilitar: boolean = true;

  
  constructor() { }

  ngOnInit(): void {
  }

  /**Metod encargado de cambiar de estad el listado de cursos */
  cambiarEstado(): void {
    if (this.habilitar == true) {
      this.habilitar = false;
    } else {
      this.habilitar = true;
    }

  }

}
