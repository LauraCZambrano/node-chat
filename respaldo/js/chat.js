let socket = io();

let params = new URLSearchParams(window.location.search);

if(!params.has('name') || !params.has('room')){
    window.location = 'index.html';
    throw new Error('Name and room are required');
}

let user = {
    name: params.get('name'),
    room: params.get('room')
};


//conexion con el servidor
socket.on('connect', function(){
    console.log('Conectado al servidor');

    socket.emit('enterChat', user, function(res){
        console.log(res);
    });
});

socket.on('disconnect', function(){
    console.log('Servidor desconectado');
});

//enviar datos al servidor
// socket.emit('recibirMensaje', {
//     message: 'aaaaa'
// }, function(resp){
//     console.log(resp);
// });

//recibir datos del servidor
socket.on('createMessage', function(res) {
    console.log(res);
});

socket.on('listUsers', function(res) {
    console.log(res);
});

socket.on('privateMessage', function(message){
    console.log('Private', message);
});
