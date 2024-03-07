const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/ld+json' });
  res.write(JSON.stringify({
    "@context": [
      "https://www.w3.org/ns/solid/oidc-context.jsonld",
      {
        "interop": "http://www.w3.org/ns/solid/interop#"
      }
    ]  ,
    "client_id": "http://localhost:3009/id.json",
    "client_name": "LDO React Tutorial",
    "logo_uri": "https://robohash.org/ldo-react-tutorial?set=set3",
    "redirect_uris": ["http://localhost:3006/callback"],
    "grant_types" : ["refresh_token","authorization_code"],
    "interop:hasAccessNeedGroup": "http://localhost:3006/access-needs.ttl",
    "interop:hasAuthorizationCallbackEndpoint": "http://localhost:3006"
  }, null, 2));
  res.end();
}).listen(3009);
