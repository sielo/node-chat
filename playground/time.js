const moment = require('moment');   // https://momentjs.com/


//console.log('joł!');

var date = moment();   // data dzisiejsza
var createdAt = 12345;
var czas = moment(createdAt); // tworzy datę z podanego "timestampa"
var timeStamp = moment().valueOf();
date.locale('pl');
console.log(date.format('YYYY-mm-DD ... MMM YYYY Do DDDo dddd MMMM'));

date.add(10, 'years').subtract(90, 'months');
console.log(date.format('YYYY-mm-DD'));