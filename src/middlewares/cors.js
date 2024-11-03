import cors from 'cors';


export const corsMiddleware = () => cors(
    {
        origin: (origin, callback) => {

            const accesos_permitidos = [
                process.env.PUBLIC_URL,
                'http://localhost:3000',
                'http://localhost:4000'
            ];

            if (accesos_permitidos.includes(origin)) {
                callback(null, true);
            } 
            
            if (!origin) {
                callback(null, true);
            }

            callback(new Error('Acceso no permitido'));

        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
);