const { io } = require('./server');
const { Users } = require('./classes/users');
const { createMessage } = require('./utilidades');

const users = new Users();

io.on('connection', (client) => {

    client.on('enterChat', (user, callback) => {
        if(!user.name || !user.room){
            return callback({
                ok: false,
                message: 'Name and room are required'
            });
        }

        client.join(user.room);

        users.addUser(client.id, user.name, user.room);

        callback(users.getUsersPerRoom(user.room));
        client.broadcast.to(user.room).emit('createMessage', createMessage('Administrador', `${user.name} entered the chat`));
        client.broadcast.to(user.room).emit('listUsers', users.getUsersPerRoom(user.room));
    });

    client.on('disconnect', () => {
        let deletedUser = users.removeUser(client.id);
        client.broadcast.to(deletedUser.room).emit('createMessage', createMessage('Administrador', `${deletedUser.name} left the chat`));
        client.broadcast.to(deletedUser.room).emit('listUsers', users.getUsersPerRoom(deletedUser.room));
    });

    client.on('createMessage', (data, callback) => {
        let user = users.getUser(client.id);
        let message = createMessage(user.name, data.message);
        client.broadcast.to(user.room).emit('createMessage', message);
        callback(message);
    });

    client.on('privateMessage', (data) => {
        // if(!data.id){
        //     return callback({
        //         ok: false,
        //         message: 'Id is required'
        //     });
        // }

        let user = users.getUser(client.id);

        client.broadcast.to(data.for).emit('privateMessage', createMessage(user.name, data.message));
    });
});