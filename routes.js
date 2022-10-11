const fs = require('fs');
const { request } = require('http');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>')
        res.write('<head><title> Enter message </title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text"name="message"><button>Send</button></form></body>')
        res.write('</html>');
        return res.end();
}
if(url === '/message' && method === 'POST'){
    const body =[]
    req.on('data', (chunk)=>{
        console.log(chunk)
        body.push(chunk);
    });
    return req.on('end',()=>{
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.writeFile('message.txt', message, err =>{
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    });
}
res.setHeader('Content-Type','text/html');
res.write('<html>');
res.write('<head><title>MY First Page</title></head>'); 
res.write('<body><h1>Welcome to my Node JS Project</h1></body>');
res.write('</html>');
res.end();
};

// //First method 
// module.exports = requestHandler;

// Second method
// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// Third method
// module.exports.handler = requestHandler;
// module.exports.someText = 'some hard coded text';


exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
