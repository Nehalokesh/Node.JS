const http = require('http');
const fs= require('fs')

const server=http.createServer((req,res) => {
    const url = req.url;
    const method =req.method;
    if(url === '/'){
        fs.readFile("message.text",{encoding:'utf-8'},(err,data) =>{
            if(err){
                console.log(err)

            }
            console.log(`data from file`+data)
            res.setHeader('Content-Type','text/html');
            res.write('<html>')
            res.write('<head><title> Enter message </title></head>')
            res.write(`<body>${data}</body>`)
            res.write('<body><form action="/message" method="POST"><input type="text"name="message"><button>Send</button></form</body>')
            res.write('</html>')
            return res.end()
        });   

    }
    else if(url === '/message' && method === 'POST'){
        const body =[]
        req.on('data', (chunk)=>{
            console.log(chunk)
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody =Buffer.concat(body).toString();
            console.log('parsedbody>>>>>',parsedBody)
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.text',message, (err) =>{
                if(err){
                    console.log(err)

                }
                console.log(`inside.fs.writefile`)
                res.statusCode =302;
                res.setHeader('location','/');
                return res.end();


        });
    });
    }
});
server.listen(5000);