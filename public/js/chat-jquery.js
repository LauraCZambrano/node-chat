let params = new URLSearchParams(window.location.search);
let name = params.get('name');
let room = params.get('room');

//referencias
let divUsuarios = $('#divUsuarios');
let formSend = $('#formSend');
let txtMessage = $('#txtMessage');
let divChatbox = $('#divChatbox');


function renderUser(users){

    let html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> '+ params.get('room') +'</span></a>';
    html += '</li>';

    for(var i = 0; i<users.length; i++){
        html += '<li>';
        html += '<a data-id="'+ users[i].id +'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+ users[i].name +' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);
}

function renderMessages(message, me){

    let html = '';
    let date = new Date(message.date);
    let hour = date.getHours() + date.getMinutes();
    let adminClass = 'info';

    if(message.name === 'Administrador'){
        adminClass = 'danger'
    }

    if(me){
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+ message.name +'</h5>';
        html += '        <div class="box bg-light-inverse">'+ message.message +'</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">'+hour+'</div>';
        html += '</li>';
    }else{
        html += '<li class="animated fadeIn">';
        if(message.name !== 'Administrador'){
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html +=     '<div class="chat-content">';
        html +=         '<h5>'+ message.name +'</h5>';
        html +=         '<div class="box bg-light-'+adminClass+'">'+ message.message +'</div>';
        html +=     '</div>';
        html +=     '<div class="chat-time">'+hour+'</div>';
        html += '</li>';
    }

    divChatbox.append(html);    

}


function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//listeners de jquery
divUsuarios.on('click', 'a', function(){
    // para obtener el id de la etiqueta --> <a data-id="'+ users[i].id +'" ... >
    let id = $(this).data('id');

    if(id){
        console.log(id);
    }

});

formSend.on('submit', function(e){
    e.preventDefault();

    if(txtMessage.val().trim().length === 0){ //trim() quita los espacios al principio o al final de la cadena
        return;
    } 

    socket.emit('createMessage', {
        name: name,
        message: txtMessage.val()
    }, function (res) {
        txtMessage.val('').focus();
        renderMessages(res, true);
        scrollBottom();
    });
});