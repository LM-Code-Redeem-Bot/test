const http = require('http');
const url = require('url');
const yaml = require('js-yaml');
const fs = require('fs');
const pathmodule = require('path');

const hostname = 'localhost';
const port = 3000;
const baseDir = __dirname + "/";
const debug = false;

function readTemplateFile(fileName) {
    let templHtml = '';
    fileName = baseDir + 'html/templates/' + fileName;
    templHtml = fs.readFileSync(fileName, 'utf8');

    return templHtml;
}

/**
 * Main Program - Start Server
 */
const server = http.createServer((req, res) => {
    if (req.url.includes('.css')) {
        sendFileContent(res, req.url.toString().substring(1), "text/css");
    } else if (req.url.includes('.js')) {
        sendFileContent(res, req.url.toString().substring(1), "text/javascript");
    } else if (req.url.includes('.jpg')) {
        sendFileContent(res, req.url.toString().substring(1), "image/jpg");
    } else if (req.url.includes('.png')) {
        sendFileContent(res, req.url.toString().substring(1), "image/png");
    } else if ((req.url == '/') || (req.url.includes('.html'))) {
        let reqUrl = req.url;
        if (req.url == '/') {
            reqUrl = 'index.html';
        }
        const resolvedPath = pathmodule.resolve(baseDir + 'html/' + reqUrl); // resolve will resolve "../"
        if (resolvedPath.startsWith(baseDir + 'html')) {
            fs.readFile(resolvedPath,function(err,data){
                if(err){
                    res.writeHead(404);
                    res.write("<p>Page Not found.</p>");
                } else{
                    res.writeHead(200, {
                        'Content-Type': 'text/html;charset=UTF8'
                    });
                    res.end(data);
                }
            });
        }
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.end(htmlText);
    }
});
    
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

