const http = require('http');

const server = http.createServer((req,res)=>{
    console.log(req.url, req.method, req.headers);
    res.setHeader('Conent-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Welcome to my Node JS Project</h1></body>');
    res.write('<html>');
    res.end();
});
server.listen(4000);