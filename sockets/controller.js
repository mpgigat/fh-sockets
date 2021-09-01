import coordenadasController from "../controllers/coordenada.js";



const socketController = (socket) => {
    
    console.log('Cliente conectado', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    socket.on('coordenadaPost',async ( payload, callback ) => {

        const coordenadas = await coordenadasController.coordenadaSocketPost(payload )
console.log(`Coordanada: ${coordenadas}`);
        callback( coordenadas );//primero sin estas dos lineas
        //es como un feedback de que que todo se ejecuta correctamente

        socket.broadcast.emit('coordenadas', coordenadas );
       //socket.emit('enviar-mensaje', payload );

    })

}



export {
    socketController
}

