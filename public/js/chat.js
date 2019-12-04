let socket = io();

let paramsearch = new URLSearchParams(window.location.search);

if(!paramsearch.has('name') || !paramsearch.has('room')){
    window.location = 'index.html';
    throw new Error('Name and room are required');
}

let user = {
    name: paramsearch.get('name'),
    room: paramsearch.get('room')
};


//conexion con el servidor
socket.on('connect', function(){

    socket.emit('enterChat', user, function(res){
        //console.log(res);
        renderUser(res);
    });
});

socket.on('disconnect', function(){
    console.log('Servidor desconectado');
});


//recibir datos del servidor
socket.on('createMessage', function(res) {
    // console.log(res);
    renderMessages(res, false);
    scrollBottom();
});

socket.on('listUsers', function(res) {
    //console.log(res);
    renderUser(res);
});

socket.on('privateMessage', function(message){
    console.log('Private', message);
});
