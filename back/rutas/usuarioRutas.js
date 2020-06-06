const express = require('express');

//Requerimos el usuarioControl para traer los parametros por medio de una constante de las rutas de usuarios
const UsuarioControl = require("../control/usuarioControl");

var api = express.Router();

// Importar el paquete connect-multyparty
const multipart = require('connect-multiparty');
// A través de connect-multyparty, pauntamos a la carpeta que deseemos en que se guarden los archivos
const subirImgDirectorio = multipart({ uploadDir: './archivos/usuarios' });

// Ruta Registrar Usuario -> anguar url http://localhost:3000/api
api.post('/registro', UsuarioControl.registrarUsuario); // De UsuarioControl como esta conectado con su js , asignamos la funcion de registrarUsuario, la cual enviará los datos del objeto Json

// Ruta login
api.post('/login', UsuarioControl.login);

// Ruta Actualizar Usuario
api.put('/update/:id', UsuarioControl.actualizarUsuario);

// Ruta Subir imagen Usuario
api.put('/subirImg/:id', subirImgDirectorio, UsuarioControl.subirImg);


// Ruta mostrar imagen Usuario
api.get('/obtenerImagen/:imageFile', UsuarioControl.mostrarArchivo);

// Exportar el módulo
module.exports = api;

// Protección de rutas en Angular -> guards