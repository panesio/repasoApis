// Solicitud del modelo de usuario
const Usuario = require('../modelo/usuario');

// Importar el módulo File System de Node
const fs = require('fs');

// Importar el módulo Path de Node
const path = require('path');

// Función Registro Usuario
function registrarUsuario(req, res) {
    var usuario = new Usuario();
    var parametros = req.body;

    // Relacionamos los parametros del modelo
    usuario.nombre = parametros.nombre;
    usuario.apellido = parametros.apellido;
    usuario.correo = parametros.correo;
    usuario.contrasena = parametros.contrasena;
    usuario.rol = 'usuario'; // Podemos quemar en la BD el regitro del usuario con rol admin
    usuario.imagen = null;

    // Function save para interactuar con la BD
    usuario.save((err, usuarioNuevo) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (!usuarioNuevo) {
                res.status(200).send({ message: "No fue posible realizar el registro" });
            } else {
                res.status(200).send({
                    message: "Usuario creado",
                    usuario: usuarioNuevo
                });
            }
        }
    });

}
// Función Login 
function login(req, res) {
    var parametros = req.body;
    var correoUsuario = parametros.correo;
    var contraUsuario = parametros.contrasena;

    Usuario.findOne({ correo: correoUsuario }, (err, usuarioLoggeado) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        } else {
            if (!usuarioLoggeado) {
                res.status(200).send({ message: "Usuario inexistente" });
            } else {
                if (usuarioLoggeado.contrasena != contraUsuario) { // El usuarioLoggeado contiene todos los datos del usuario a que se quiere entrar
                    res.status(200).send({ message: "Contraseña incorrecta" });
                } else {
                    res.status(200).send({
                        message: "Usuario Loggeado!",
                        usuario: usuarioLoggeado
                    })
                }
            }
        }
    });

}

// Función actualizar usuario
function actualizarUsuario(res, req) {
    var usuarioId = req.params.id;
    var nuevosDatosUsuario = req.body;

    Usuario.findByIdAndUpdate(usuarioId, nuevosDatosUsuario, (err, usuarioActualizado) => {
        if (err) {
            res.status(200).send({ message: "Error en el servicio" });
        } else {
            if (!usuarioActualizado) {
                res.status(200).send({ message: "No fue posible actualizar tus datos" });
            } else {
                res.status(200).send({
                    message: "Usuario actualizado!",
                    usuario: nuevosDatosUsuario
                });
            }
        }
    });
}

// Función subir IMG
function subirImg(req, res) {
    var usuarioId = req.params.id;
    var nombreArchivo = "No has subido ninguna imagen...";

    // Validar si efectivamente se está enviando un archivo
    if (req.files) {
        // Vamos a ir analizando la ruta del archivo , el nombre y la extensión
        // C:\usuarios\descargas\imagen.png

        var rutaArchivo = req.files.imagen.path;
        console.log(`ruta archivo: ${rutaArchivo}`);

        // Haremos un split para separar elementos 
        //Esto nos generará un arreglo de datos

        var partirArchivo = rutaArchivo.split('\\');
        console.log(`Partir Archivo : ${partirArchivo}`);

        // Acceder a la posición que contiene el nombre del archivo
        var nombreArchivo = partirArchivo[2];
        console.log(`Posicion dato : ${nombreArchivo}`);

        // Haremos un split para separar el nombre del archivo de la extensión
        var extensionImg = nombreArchivo.split('\.');
        console.log(`PartirImg : ${extensionImg}`);

        // Accedemos a la posición de la extensión del archivo
        var extensionArchivo = extensionImg[1];
        console.log(`Extesion Archivo : ${extensionArchivo}`);

        // Validar si el formato del archivo es aceptable
        if (extensionArchivo == 'png' || extensionArchivo == 'jpg') {
            //Actualizar del usuario el campo imagen
            Usuario.findByIdAndUpdate(usuarioId, { imagen: nombreArchivo }, (err, usuarioConImg) => {
                if (err) {
                    res.status(500).send({ message: "Error en el servidor" });
                } else {
                    if (!usuarioConImg) {
                        res.status(200).send({ message: "No fue posible subir la imagen" });
                    } else {
                        res.status(200).send({
                            message: "Imagen anexada",
                            imagen: nombreArchivo,
                            usuario: usuarioConImg
                        });
                    }
                }
            });
        } else {
            // Formato no válido
            res.status(200).send({ message: "Formato no válido de la imagen" });
        }
    } else {
        res.status(200).send({ message: "No has subido imagenes" })
    }

}

// Función mostrar archivo
function mostrarArchivo(req, res) {
    // Pedir el archivo que queremos mostrar
    var archivo = req.params.imageFile;

    // Ubicacion del archivo
    var ruta = './archivos/usuarios/' + archivo;

    // Validar si existe o no
    // fs.exists('la ruta del archivo a buscar',(existencia)=>{})
    fs.exists(ruta, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(ruta));
        } else {
            res.status(200).send({ message: "Imagen no encontrada" });
        }
    });

}

// Exportar paquete de funciones
module.exports = {
    registrarUsuario,
    login,
    actualizarUsuario,
    subirImg,
    mostrarArchivo
}