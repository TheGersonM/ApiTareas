import express, { json } from 'express';
import tareasRouter from './routers/tareas.js';
import {corsMiddleware} from './middlewares/cors.js';

const app = express();

//Middlewares
app.disable('x-powered-by');
app.use(json());
app.use(corsMiddleware());

const PORT = process.env.PORT || 3000;
//configuraciones
app.set('port', PORT);



//rutas
app.use('/api/tareas', tareasRouter);

//middleware para manejo de rutas no encontradas
app.use((req, res) => {
    res
    .header('Content-Type', 'application/json')
    .status(404)
    .send({ message: `Ruta ${req.url} no encontrada` });
});

app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en el puerto ${app.get('port')}`);
});

export default app;

