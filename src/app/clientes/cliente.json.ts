import { Cliente } from "./cliente";
import { formatDate } from '@angular/common';

let fecha: Date = new Date;
export const listadoClientes: Cliente[] = [
    {'id':'1','email':'algo@algo.com','nombre': 'juan', 'apellido': 'perdomo', 'edad': '25', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'2','email':'algo@algo.com', 'nombre': 'mario', 'apellido': 'wagner', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'3','email':'algo@algo.com', 'nombre': 'camilo', 'apellido': 'velez', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'4','email':'algo@algo.com', 'nombre': 'pedro', 'apellido': 'uribe', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'5','email':'algo@algo.com', 'nombre': 'pepe', 'apellido': 'santos', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'6','email':'algo@algo.com', 'nombre': 'valeria', 'apellido': 'hidalgo', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'7','email':'algo@algo.com', 'nombre': 'dayana', 'apellido': 'fernadez', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'8','email':'algo@algo.com', 'nombre': 'viviana', 'apellido': 'botero', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'9','email':'algo@algo.com', 'nombre': 'steven', 'apellido': 'ramirez', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'10','email':'algo@algo.com', 'nombre': 'gonzalo', 'apellido': 'montoya', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'11','email':'algo@algo.com', 'nombre': 'maria', 'apellido': 'ocampo', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'12','email':'algo@algo.com', 'nombre': 'samuel', 'apellido': 'cifuentes', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'13','email':'algo@algo.com', 'nombre': 'juana', 'apellido': 'vivi', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'14','email':'algo@algo.com', 'nombre': 'mauricio', 'apellido': 'orozco', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'15','email':'algo@algo.com', 'nombre': 'johana', 'apellido': 'rodriguez', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') },
    {'id':'16','email':'algo@algo.com', 'nombre': 'patricia', 'apellido': 'agudelo', 'edad': '35', 'fechaCreacion': formatDate(fecha, 'dd/MM/yyyy', 'en-US') }
];