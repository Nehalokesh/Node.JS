const http = require('http');

const server = http.createServer((req,res)=>{
    console.log('Neha');
});
server.listen(4000);