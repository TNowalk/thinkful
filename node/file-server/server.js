'use strict';

var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var qs = require('querystring');

var root = __dirname;

var server = http.createServer(function(req, res) {
  if(req.url == '/') {
    switch(req.method) {
      case 'GET':
      req.url = '/index.html';
      break;
      case 'POST':
      var item = '';req.setEncoding('utf8');
      req.on('data', function(chunk){
        item += chunk;
      });
      req.on('end', function() {
        var obj = qs.parse(item);
        res.end('The item: "' + obj.item + '" was added successfully');
      });
    }
  }
  var url = parse(req.url);
  var path = join(root, url.pathname);

  fs.stat(path, function(err, stat) {
    if (err) {
      if (err.code == 'ENOENT') {
        res.statusCode = 404;
        res.end('File Not Found');
      } else {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    } else {
      var stream = fs.createReadStream(path);
      res.setHeader('Content-Length', stat.size);
      stream.pipe(res);
      stream.on('error', function(err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
    }
  });
});

server.listen(9000, function() {
  console.log('Server started at http://localhost:9000');
});