var express = require('express');
var serveStatic = require('serve-static');
var fs = require('fs');
var app = express();

app.get('/wickel', function (req, res) {
    fs.readFile('./static/wickel.dat', 'utf8', function(err, contents) {
        if(!contents) contents = ""
        res.send(contents.replace("\n", "<br>"));
    });
});

app.get('/still', function (req, res) {
    fs.readFile('./static/still.dat', 'utf8', function(err, contents) {
        if(!contents) contents = ""
        res.send(contents.replace("\n", "<br>"));
    });
});

app.use(serveStatic("./static"));
app.listen(8083);