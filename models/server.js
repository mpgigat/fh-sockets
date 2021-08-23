import  express from 'express'
import cors from 'cors'
import http from 'http'
import * as io from "socket.io"
//const { socketController } = require('../sockets/controller');
import { socketController } from '../sockets/controller.js';
import { dbConnection } from '../database/config.js';

import coordenada from "../routes/coordenada.js";

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = http.createServer( this.app );
        this.io     = new io.Server( this.server );//io toda la info de los sockets conectados.

        this.paths = {};

        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        //parseo y lectura del body
        this.app.use(express.json());

        // Directorio Público
       // this.app.use( express.static('public') );

        this.app.use((err, req, res, next) => {
            if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
                //console.error(err);
                return res.status(400).send({ status: 404, message: err.message }); // Bad request
            }
            next();
        });
    }

    routes() {        
        this.app.use('/api/coordenada',coordenada);        
    }

    sockets() {

        this.io.on('connection', socketController );

    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




export {Server};