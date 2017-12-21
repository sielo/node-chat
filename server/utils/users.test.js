const expect = require('expect');
const { Users } = require('./users.js');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Pokój'
        }, {
            id: '2',
            name: 'Pola',
            room: 'Kuchnia'
        }, {
            id: '3',
            name: 'Bronek',
            room: 'Kibel'
        }];
    });

    it('Should add a new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Michał',
            room: 'Pokój'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
});