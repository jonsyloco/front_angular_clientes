import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import '@angular/common/locales/global/es-US'; //Insertando el locale, para ver las fechas en español




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CursosComponent } from './cursos/cursos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './service/cliente.service';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { FormsModule } from "@angular/forms";
import { PaginadorComponent } from './paginador/paginador.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FotoUsuarioComponent } from './foto-usuario/foto-usuario.component';




/**para manejar rutas */
import { RouterModule, Routes, Router } from "@angular/router";
const routes: Routes = [
  { path: '', redirectTo: '/cursos', pathMatch: 'full' },
  { path: 'cursos', component: CursosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/pagina/:page', component: ClientesComponent },
  { path: 'crearCliente', component: FormClienteComponent },
  { path: 'crearCliente/:id', component: FormClienteComponent }, // este parametro :id se obtiene en el metodo cargarCliente con ActivateRoute
  { path: 'ver_foto/:id', component: FotoUsuarioComponent} // este parametro :id se obtiene en el metodo cargarCliente con ActivateRoute

];
/**----------------------- */


export const MY_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};



@NgModule({
  declarations: [/**se resgitran todos los componentes creados */
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CursosComponent,
    ClientesComponent,
    FormClienteComponent,
    PaginadorComponent,
    FotoUsuarioComponent
  ],
  imports: [ /**cargar configuraciones de la base de datos,HTTP, firebase, memory data, rutas etc */
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule
  ],
  providers: [ /**se registran los servicios json*/
    ClienteService,
    { provide: LOCALE_ID, useValue: 'es-US' }, //para colocar toda la aplicacion en español por defecto
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT },


  ],
  bootstrap: [AppComponent] /**aqui se indica el componente principal a cargar */
})
export class AppModule { }
