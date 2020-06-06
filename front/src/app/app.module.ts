import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importar el modulo de rutas que creamos en app-routing
import { AppRoutingModule } from './app-routing.module';

// Importar el módulo fromularios
import { FormsModule } from '@angular/forms'

// Importar el módulo HttpClientModule
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { RegistroComponent } from './components/registro/registro.component';

// Importar Servicio Usuario
import { UsuarioService } from './services/usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    PerfilUsuarioComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
