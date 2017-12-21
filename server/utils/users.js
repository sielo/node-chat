class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = { id, name, room }
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var removedUser = this.getUser(id);
        if (removedUser) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return removedUser;
    }

    getUser(id) {
        var users = this.users.filter((user) => user.id === id);
        return users[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
}

module.exports = { Users }



















// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription () {
//         return `${this.name} ma ${this.age} lat/lata`;
//     }
// }

// var me = new Person('Michał', 123);

// console.log(me);
// console.log(me.getUserDescription());

