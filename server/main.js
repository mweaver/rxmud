var http = require('http'),
    sockjs = require('sockjs'),
    port = 8888,
    clients = {},
    echo = sockjs.createServer(),
    httpServer = http.createServer();

function broadcast(message) {

    for (var client in clients){
        // send the message to that client
        clients[client].write(JSON.stringify(message));
    }
}

echo.on('connection', function (conn) {
    console.log('connected');
    clients[conn.id] = conn;

    conn.on('data', function(message) {
        console.log(message);
        broadcast(JSON.parse(message));
    });

    conn.on('close', function() {
        delete clients[conn.id];
    });
});

echo.installHandlers(httpServer, { prefix: '/echo' });

httpServer.listen(port, '0.0.0.0');

console.log('Server listening on port', port);