var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('hello tout le monde, ceci est mon premier serveur crée');
    res.end();
    console.log('serveur lancé sur le port 5000.........');
}).listen(5000);