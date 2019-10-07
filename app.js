const server = require('http').createServer();
const fs = require('fs');
const Router = require('router');
const finalhandler = require('finalhandler');

const router = new Router();

server.on('listening', function () {
    console.log('server is up and running');
});

server.on('request', function (request, response) {
    router(request, response, finalhandler(request, response));
});
let port = process.env.PORT;
// let port = 8000;
server.listen(port);

router.get('/', function(request, response) {
    response.writeHead(200, {'content-type': 'text/html'});
    fs.createReadStream('./index.html').pipe(response);
});

router.get(/\/js\/.+/, function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/js'});
    fs.createReadStream(`.${request.url}`).pipe(response);
});

router.get(/\/css\/.+/, function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/css'});
    fs.createReadStream(`.${request.url}`).pipe(response);
});

router.get(/\/img\/.+/, function (request, response) {
    if (request.url.search(/.svg$/) >= 0) {
        response.writeHead(200, {'Content-Type': 'image/svg+xml'});
    }
    else if (request.url.search(/.png$/) >= 0) {
        response.writeHead(200, {'content-type': 'image/png'})
    }
    fs.createReadStream(`.${request.url}`).pipe(response);
});