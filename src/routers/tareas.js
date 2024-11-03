import { Router } from "express"; 
import { TareasController} from '../controllers/tareas-controller.js';


const tareasRouter = Router();

//taeras 

tareasRouter.get('/', TareasController.getAllTareas);

tareasRouter.get('/:id', TareasController.getTareaById);

tareasRouter.post('/', TareasController.createTarea);

tareasRouter.put('/:id', TareasController.updateTarea);

tareasRouter.delete('/:id', TareasController.deleteTarea);



export default tareasRouter;