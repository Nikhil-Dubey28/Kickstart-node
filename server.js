const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body>');
    
    // Read messages from file
    fs.readFile('message.txt', 'utf8', (err, data) => {
      if (!err) {
        const messages = data.split('\n').filter(Boolean);
        if (messages.length > 0) {
          const latestMessage = messages[messages.length - 1];
          res.write(`<p>${latestMessage}</p>`);
        }
      }
      
      res.write('<form action="/message" method="POST">');
      res.write('<input type="text" name="message">');
      res.write('<button type="submit">Send</button>');
      res.write('</form>');
      res.write('</body>');
      res.write('</html>');
      return res.end();
    });
  } else if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message + '\n', err => {
        if (err) {
          res.statusCode = 500;
          res.end('Error occurred while saving the message.');
        } else {
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        }
      });
    });
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
  }
});

server.listen(3000);
