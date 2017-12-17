const expect = require('expect');
var { generateMessage } = require('./message.js');


describe('generateMessage', () => {
    it('should generate correct message', () => {
        var from = 'John';
        var text = 'Some message';
        var mess = generateMessage(from , text);
        expect(typeof mess.createdAt).toBe('number'); 
        expect(mess.text).toBe(text);
        expect(mess.from).toBe(from);
    });
});