const http = require('http');
const { handleRequest } = require('./route');

const server = http.createServer(handleRequest);

server.listen(3000, () => {
    console.log('listening on port 3000')
});
