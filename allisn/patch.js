const fs = require('fs');
const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/node: false/g, 'node: {crypto: true, stream: true}');

  fs.writeFile(f, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

/*This is to fix errors: 
    ERROR in ./node_modules/jwa/index.js
Module not found: Error: Can't resolve 'crypto' in 'C:\Users\Lesego\Documents\GitHub\Botic\allisn\node_modules\jwa'
ERROR in ./node_modules/jws/lib/sign-stream.js
Module not found: Error: Can't resolve 'stream' in 'C:\Users\Lesego\Documents\GitHub\Botic\allisn\node_modules\jws\lib'
ERROR in ./node_modules/jws/lib/verify-stream.js
Module not found: Error: Can't resolve 'stream' in 'C:\Users\Lesego\Documents\GitHub\Botic\allisn\node_modules\jws\lib'
ERROR in ./node_modules/jws/lib/data-stream.js
Module not found: Error: Can't resolve 'stream' in 'C:\Users\Lesego\Documents\GitHub\Botic\allisn\node_modules\jws\lib'
*/