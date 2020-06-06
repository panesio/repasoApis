const mongoose = require('mongoose');
const Shema = mongoose.Schema;

// Objeto Schema 
var UsuarioSchema = new Shema({
    nombre: String,
    apellido: String,
    correo: String,
    contrasena: String,
    rol: String,
    imagen: String
});

// Exportar el modelo
module.exports = mongoose.model('usuario', UsuarioSchema);