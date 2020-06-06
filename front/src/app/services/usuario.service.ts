import { Injectable } from '@angular/core';

// Importar los módulos HttpClient y HttpHeaders
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Importar el map
import { map } from 'rxjs/operators';

// Importar el observable
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

// Declarar la variable url de la api
url = 'http://localhost:3000/api/';

// Declarar variable privada de tipo HttpClient
  constructor(
    private _http: HttpClient
  ) { }


  // Declarar el método del servicio registro
  registro(usuarioNuevo){
    let params = JSON.stringify(usuarioNuevo);
    let options = {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    };
    return this._http.post(
      this.url + 'registro',
      params,
      options
    ).pipe(map( res => res));
  }
}
