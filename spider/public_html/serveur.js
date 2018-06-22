var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Salut tout le monde !');
    res.write('hello tout le monde, ceci est mon premier serveur créer');
    res.end();
    console.log('serveur lancé sur le port 5000.........');
}).listen(5000);
