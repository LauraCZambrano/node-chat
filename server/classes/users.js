class Users{
    constructor(){
        this.users = [];
    }

    //agrego un usuario al chat
    addUser(id, name, room){
        let user = { id, name, room };
        console.log(user);
        this.users.push(user);

        return this.users;
    }

    //obtengo un usuario
    getUser(id){
        let user = this.users.filter(user => user.id === id)[0];

        return user;
    }

    //obtengo todos los usuarios
    getUsers(){
        return this.users;
    }

    //obtengo todos los usuarios de una sala
    getUsersPerRoom(room){
        let usersInRoom = this.users.filter(user => user.room === room);
        return usersInRoom;
    }

    //quito un usuario desconectado del chat
    removeUser(id){
        let deletedUser = this.getUser(id);

        this.users = this.users.filter(user => user.id != id);

        return deletedUser;
    }
}



module.exports = {
    Users
}