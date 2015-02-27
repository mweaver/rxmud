var http = require('http'),
    port = 8888;

console.log('Server listening on port', port);

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello World');
    response.end();
}).listen(port);
