const path = require('path');  // wbudowany w node.js
//console.log(__dirname+'/../public');  

const publicPath = path.join(__dirname,'..','public');
const port = process.env.PORT || 3000;
//console.log(publicPath);  

var express = require('express');

var app = express();

app.use(express.static(publicPath));  // wskazujemy z którego folderu pobierać pliki statyczne  np: http://localhost:3000/index.html

app.get('/abc', (req, res) => {
    res.render(publicPath+'/index');
});

app.listen(port, () => {
    console.log(`Serwer uruchomiony na porcie: ${port}`);
});
module.exports.app = app;