import { tareas } from '../models/tarea-model.js';
import { validateTareaSchema } from '../schemas/tareas.schema.js';

export class TareasController {
    static getAllTareas(req, res) {
        res
        .header('Content-Type', 'application/json')
        .status(200)
        .send(tareas);   
    }

    static getTareaById(req, res) {
        const { id } = req.params;
        const tarea = tareas.find(tarea => tarea.id === parseInt(id));
        if (!tarea) {
            return res
            .header('Content-Type', 'application/json')
            .status(404)
            .send({ message: `La tarea con id ${id} no existe` });
        }
        res
        .header('Content-Type', 'application/json')
        .status(200)
        .send(tarea);
    }

    static createTarea(req, res) {
        const { success, error, data } = validateTareaSchema(req.body);
        if (!success) {
            return res
            .header('Content-Type', 'application/json')
            .status(400)
            .send({ message: error.errors });
        }
        const tarea = data;
        tarea.id = tareas.length ? tareas[tareas.length - 1].id + 1 : 1;
        tarea.fechaCreacion = new Date().toISOString();
        tareas.push(tarea);
        res
        .header('Content-Type', 'application/json')
        .status(201)
        .send(tarea);
    }

    static updateTarea(req, res) {
        const { id } = req.params;
        const index = tareas.findIndex(tarea => tarea.id === parseInt(id));
        if (index === -1) {
            return res
            .header('Content-Type', 'application/json')
            .status(404)
            .send({ message: `La tarea con id ${id} no existe` });
        }
        const { success, error, data } = validatePartialTareaSchema(req.body);
        if (!success) {
            return res
            .header('Content-Type', 'application/json')
            .status(400)
            .send({ message: error.errors });
        }
        tareas[index] = { ...tareas[index], ...data };
        res
        .header('Content-Type', 'application/json')
        .status(200)
        .send(tareas[index]);
    }

    static deleteTarea(req, res) {
        const { id } = req.params;
        const index = tareas.findIndex(tarea => tarea.id === parseInt(id));
        if (index === -1) {
            return res
            .header('Content-Type', 'application/json')
            .status(404)
            .send({ message: `La tarea con id ${id} no existe` });
        }
        tareas.splice(index, 1);
        res
        .header('Content-Type', 'application/json')
        .status(204)
        .send();
    }
}
