var express = require('express');
var bodyParser = require("body-parser");
var serveStatic = require('serve-static');
var fs = require('fs');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(serveStatic("./static"));

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

app.get('/api/mods', function (req, res) {
    fs.readFile('./static/modifications.dat', 'utf8', function(err, contents) {
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

app.post('/api/mods', function (req, res) {
    if(!req.body.time) return res.status(400).end();
    if(req.body.milkType) {
        var data = {time: req.body.time, milkType: req.body.milkType};
        fs.appendFile('static/modifications.dat', JSON.stringify(data)+'\n', function (err) {
            if (err) {
                res.status(500).end();
            } else {
                res.status(201).end();
            }
        });
    } else {
        res.status(406).end();
    }
});

app.listen(8083);