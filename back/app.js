const express = require('express');
const app = express();
const cors = require('cors')

// Declaración de cors -> CORS lo dejaremos al final 

// Declaración de la constante de las rutas de usuarios
const UsuarioRutas = require('./rutas/usuarioRutas');

// Middelwares
app.use(express.json());
app.use(cors());

// Consumo de las rutas
app.use('/api', UsuarioRutas)

// Fin de Middlewares

// Exportación del módulo
module.exports = app;