import { Component, OnInit } from '@angular/core';

// Importar el modelo de usuario
import { Usuario } from '../../modelo/usuario';

// Importar el servicio Usuario
import { UsuarioService } from '../../services/usuario.service'

// Importar el objeto Router
// ActivatedRoute -> Nos indica una ruta activa
// Params -> Una ruta con parametros de Angular ['perfil', nombreArtista]
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

// Declaración variable usuarioRegistro
public usuarioRegistro : Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private _router : Router) { 
    this.usuarioRegistro = new Usuario('','','','','','usuario',''); // Si tenemos un campo como fecha o telefono, el campo en telefono en new Usuario iria con un 0 o un null y ela fecha null
    
  }

  ngOnInit(): void {
  }

  // Método registrarUsuario()
registrarUsuario(){
  this.usuarioService.registro(this.usuarioRegistro).subscribe(
    (response: any) =>{
      let usuario = response.usuario;
      this.usuarioRegistro = usuario;
      if(!this.usuarioRegistro._id){
        alert("Error al registrarse");
      }else{
        alert(`Registro exitoso, incia sesio con ${this.usuarioRegistro.correo}`);
        this.usuarioRegistro=new Usuario('','','','','','usuario','')
        this._router.navigate(['/login']);
      }
    },
    error=>{
      var errorMsg = <any>error;
      if(errorMsg != null){
        console.log(error);
      }
    }
  );
};
}
