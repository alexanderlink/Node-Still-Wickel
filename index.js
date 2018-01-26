var express = require('express');
var serveStatic = require('serve-static');
var fs = require('fs');
var app = express();

app.get('/api/data', function (req, res) {
    fs.readFile('./static/data.dat', 'utf8', function(err, contents) {
        if(!contents) contents = "";
        contents = "[" + contents + "]";
        res.set('Content-Type', 'application/json');
        res.set('Access-Control-Allow-Origin', '*');
        res.send(contents.replace(new RegExp("}{", 'g'), "},\n{"));
    });
});

app.use(serveStatic("./static"));
app.listen(8083);