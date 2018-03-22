'use strict';

var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path');

var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

var server = http.createServer(function (request, response) {
    console.log(request.method + ': ' + request.url);
    
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(root, pathname);
pathname.
    fs.stat(filepath, function(err, stats) {
        if (!err && stats.isFile()) {
            ret(filepath, request, response);
        } else {
            filepath = path.join(root, 'index.html');
            fs.stat(filepath, function(err, stats) {
                if (!err && stats.isFile()) {
                    ret(filepath, request, response);
                } else {
                    filepath = path.join(root, 'default.html');
                    fs.stat(filepath, function(err, stats) {
                    if (!err && stats.isFile()) {
                        ret(filepath, request, response);
                    } else {
                        console.log('404 ' + request.url);
                        response.writeHead(404);
                        response.end('404 Not Found');
                    }
            });
                }
            });
        }
    });
});

function ret(filepath, request, response) {
    console.log('200 ' + request.url);
    response.writeHead(200);
    fs.createReadStream(filepath).pipe(response);
}

server.listen(8080);
console.log('server is running at http://localhost:8080/');