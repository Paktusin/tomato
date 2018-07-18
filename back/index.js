const fs = require('fs');
const http = require('http');
const https = require('https');
const app = require('./app');

let port = process.env.PORT || 3000;

const ssl_key = process.env.SSL_KEY;
const ssl_cert = process.env.SSL_CERT;

if (ssl_key && ssl_cert) {
    const options = {
        key: fs.readFileSync(ssl_key),
        cert: fs.readFileSync(ssl_cert)
    };
    https.createServer(options, app).listen(port);
    console.log('https is listening ' + port)
} else {
    http.createServer(app).listen(port);
    console.log('http is listening on port ' + port)
}