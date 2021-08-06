const lblOffline = document.querySelector('#lblOffline');
const lblOnline = document.querySelector('#lblOnline');
const lblCoordenadas = document.querySelector('#lblCoordenadas');
const btnEnviar = document.querySelector('button');
const txtCoordenada = document.querySelector('#txtCoordenada');
const txtId = document.querySelector('#txtId');


const socket = io();

const mostrarCoordenadas = (coordenadas) => {
    let txt = "";
    coordenadas.forEach(myFunction);
    document.getElementById("lblCoordenadas").innerHTML = txt;

    function myFunction(value, index, array) {
        txt += value.iddispositivo + "=>"+value.coordenada + "<br>";
    }
}

socket.on('connect', () => {
    console.log('Conectado');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});


socket.on('coordenadas', (coordenadas) => {
    mostrarCoordenadas(coordenadas)
    console.log('Desde el server Broadcast', coordenadas);
})


btnEnviar.addEventListener('click', () => {

    const coordenada = txtCoordenada.value;
    const id = txtId.value;
    const payload = {
        coordenada,
        iddispositivo: id,
    }

    socket.emit('coordenadaPost', payload, (coordenadas) => {
        mostrarCoordenadas(coordenadas)
        console.log('Desde el server', coordenadas);
    });

});