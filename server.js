const http = require('http')

const server = http.createServer((req, res) => {
    const { url } = req
    if (url === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(`<h1>Welcome Home</h1>`)
    } else if (url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(`<h1>Welcome to About us page</h1>`)
    } else if (url === '/node') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(`<h1>Welcome to my Node.js project</h1>`)
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end(`<h1>404 Not Found</h1>`)
    }
})


server.listen(4000, () => {
    console.log('server is running on port 4000')
})