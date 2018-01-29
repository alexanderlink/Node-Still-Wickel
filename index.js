var express = require('express');
var serveStatic = require('serve-static');
var fs = require('fs');
var app = express();

app.get('/api/data', function (req, res) {
    fs.readFile('./static/data.dat', 'utf8', function(err, contents) {
        if(!contents) contents = "";
        contents = "[\n" + contents + "\n]";
        res.set('Content-Type', 'application/json');
        res.set('Access-Control-Allow-Origin', '*');
        contents = contents.replace(new RegExp("\r\n", 'g'), "\n");
        contents = contents.replace(new RegExp("\r", 'g'), "\n");
        contents = contents.replace(new RegExp("}{", 'g'), "},\n{");
        contents = contents.replace(new RegExp("}\n{", 'g'), "},\n{");
        res.send(contents);
    });
});

app.use(serveStatic("./static"));
app.listen(8083);