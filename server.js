var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, {
    	'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'
    });

    response.end('<h1>Node server is up and running</h1>');

    console.log("Server is running on port: 1337");

}).listen(1337);