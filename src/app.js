const express = require('express');
const config = require('./config');

const app = express();


const tareas = require('./modulos/tareas/rutas');

//configuraciones
app.set('port', config.app.port);



//rutas
app.use('/api/tareas', tareas);
module.exports = app;