const http = require('http');
const fs = require('fs');

const hostname = `127.0.0.1`;
const port = 5000;
const home = fs.readFileSync('./index.html')
const about = fs.readFileSync('./about.html')
const services = fs.readFileSync('./services.html')
const contact = fs.readFileSync('./contact.html')

const server = http.createServer((req, res) => {
    console.log(req.url)

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    // res.end('hello world here this is not my 2nd java tutorial');
    res.end(home);
});

server.listen(port,hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});