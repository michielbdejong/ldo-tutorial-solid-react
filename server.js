const http = require('http');
const fs = require('fs');
const idDoc = fs.readFileSync('./public/id.ttl', 'utf8');
const accessNeeds = fs.readFileSync('./public/access-needs.ttl', 'utf8');
const foafProfileShex = fs.readFileSync('./public/foafProfile.shex', 'utf8');
const descriptionsEn = fs.readFileSync('./public/descriptions-en.ttl', 'utf8');

http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.headers);
  if (req.url === '/id.ttl') {
    res.writeHead(200, { 'Content-Type': 'text/turtle' });
    res.write(idDoc);
  } else if (req.url === "/access-needs.ttl") {
    res.writeHead(200, { 'Content-Type': 'text/turtle' });
    res.write(accessNeeds);
  } else if (req.url === "/foafProfile.shex") {
    res.writeHead(200, { 'Content-Type': 'text/shex' });
    res.write(foafProfileShex);
  } else if (req.url === "/descriptions-en.ttl") {
    res.writeHead(200, { 'Content-Type': 'text/turtle' });
    res.write(descriptionsEn);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('Not found: ' + req.url);
    console.log('Not found: ' + req.url);    
  }
  res.end();
}).listen(3009);
