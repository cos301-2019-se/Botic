
// Dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');

// App
const app = express();
app.use(cors());

// Security middleware

function resSec(req, res, next) {
    // not using SSL yet
    /*if (app.get('env') !== 'stage') {
        // HTTP Strict Transport Security (HSTS)
        // Enforces HTTPS across the entire app
        // While nginx can do a redirect, HSTS redirects
        // before anything is sent to the server
        // (Only run this in an SSL environment)
        res.seHeader('Strict-Transport-Security', 'max-age=630720');
    }*/

    // Defending against Cross Site Scripting (XSS): when a malicious entity injects scripts
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // Require iFrame sources to come from the same origin
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');

    // Content Security Policy: Preventing XSS to ensure that scripts only come from approved origins
    res.setHeader("Content-Security-Policy", "script-src 'self'");

    //send the request onwards with security headers
    return next();
}
app.use(resSec);

// Set a static path to the Angular app
app.use('/', express.static(path.join(__dirname, './dist/allisn')));

// Pass routing to the Angular App
app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname, '/dist/allisn/index.html'));
});

// Start the app by listening on the default Heroku port

app.listen(process.env.PORT || 8080);
