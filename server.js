// Imports
const http = require('node:http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer();

// The server itself
server.on('request', (req, res) => {

  // Debugging only
  console.log(req);
  
  // Handle HTTP methods
  if (req.method == "GET") {

    // Set file path, special handling for the index
    const prefix = "./page";
    var filepath = prefix + req.url;
    if (filepath == prefix + "/") { filepath = prefix + "/index.html"; }

    serveFile(filepath, res);
  } else if (req.method == "POST") {

    // TODO: Implement Baron Bus position updater
    res.statusCode = 501;
    res.setHeader('Content-Type', 'text/plain');
    res.end('WIP\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function serveFile(fPath, response) {

  // Set content type, more can be added as needed
  const extname = path.extname(fPath);
  var contentType = "text/plain";
  switch (extname) {
    case '.css':
        contentType = 'text/css';
        break;
    case '.html':
        contentType = 'text/html';
        break;
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.png':
        contentType = 'image/png';
        break;
  }

  fs.readFile(fPath, function(error, content) {

    if (error) {

      if(error.code == 'ENOENT') {

        response.writeHead(404);
        response.end("Error 404: File not found");
      } else {

        response.writeHead(500);
        response.end("Error 500: Internal server error");
      }
    } else {

        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
    }
  });
}