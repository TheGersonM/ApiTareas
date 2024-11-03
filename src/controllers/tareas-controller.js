import { tareas } from '../models/tarea-model.js';
import { Router } from "express";



export class TareasController
{
    static getAllTareas() {
        res
        .header('Content-Type', 'application/json')
        .status(200)
        .send(tareas);   
    }

    static getTareaById(req, res) {
        const { id } = req.params;
        const tarea = tareas.find(tarea => tarea.id === parseInt(id));
        if (!tarea) {
            res
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
        const tarea = req.body;
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
            res
            .header('Content-Type', 'application/json')
            .status(404)
            .send({ message: `La tarea con id ${id} no existe` });
        }
        tareas[index] = req.body;
        res
        .header('Content-Type', 'application/json')
        .status(200)
        .send(tareas[index]);
    }

    static deleteTarea(req, res) {
        const { id } = req.params;
        const index = tareas.findIndex(tarea => tarea.id === parseInt(id));
        if (index === -1) {
            res
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