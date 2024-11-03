import {z} from 'zod';


const tareasSchema = z.object({
    "id": z.number(
        { 
            message: "El id debe ser un número" 
        }
    ),
    "titulo": z.string(
        {
            message: "El título debe ser un string"
        }
    ),
    "descripcion": z.string(
        {
            message: "La descripción debe ser un string"
        }
    ).trim()
    .min(20, {message: "La descripción debe tener al menos 20 caracteres"})
    .max(200, {message: "La descripción debe tener como máximo 200 caracteres"}),
    "estado": z.boolean(),
    "fechaCreacion": z.string(),

}).strict();

export const validateTareaSchema = (tarea) => tareasSchema.safeParse(tarea);

export const validatePartialTareaSchema =  (tarea) => tareasSchema.partial().safeParse(tarea);