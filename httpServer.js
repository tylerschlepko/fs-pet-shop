const fs = require('fs')
const http = require('http')
const PORT = process.env.PORT || 8000
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')
const petRegExp = /^\/pets\/(.*)$/;

const server = http.createServer(function(req, res) {
    let index = req.url[req.url.length - 1]
    if(req.method === 'GET' && req.url === '/pets'){
        fs.readFile(petsPath, 'utf8', function(err, data){
            if(err){
                console.error(err.stack)
                res.statusCode = 500
                res.setHeader('Content-Type', 'text/plain')
                return res.end('Internal Server Error')
            } else {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(data)
            }
        })
    } else if (req.method === 'GET' && req.url === `/pets/${index}`){
        fs.readFile(petsPath, 'utf8', function(err, data){
            if(parseInt(index) >= 0 && parseInt(index) <= JSON.parse(data).length - 1){
                if(err){
                    console.error(err.stack)
                    res.statusCode = 500
                    res.setHeader('Content-Type', 'text/plain')
                    return res.end('Internal Server Error')
                } else {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(JSON.parse(data)[parseInt(index)]))
                }

            } else {
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/plain')
            res.end("Not found")
            }
        })
    } else if (req.method === 'POST' && req.url === '/pets'){
        let body = ''
        req.on('data', function(chunk){
            body += chunk
        })
        req.on("end", function(){
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(body);
        });
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end("Not found")
    } 
    
})

server.listen(PORT, function() {
    console.log('Listening on port', PORT)
})