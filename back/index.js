// El indexedDB.js es el puente entre la base de datos de mongo y la parte back de nuestra página

const mongoose = require('mongoose');
const app = require('./app');
const port = 3000; // Process.env.PORT     -> Puerto de conexión del servidor

// Especificamos mongodb , el puerto de mongo , nuestra base de datos
mongoose.connect('mongodb://localhost:27017/vicadisk', (err, res) => {
    if (err) {
        console.log(`El error es: ${err}`);
    } else {
        console.log("Funciona!");
        // app.set('port, process.env.PORT  || 3000 );  -> Configuración de puerto del hostin
        app.listen(port, () => {
            console.log(`Puerto: ${port}`);
        })
    }
});

// spring-data -> Interacción con varias BD