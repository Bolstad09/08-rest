'use strict';

const router = require('../lib/router.js');

/**
 * GET Route (/)
 * Accepts an optional "name" query string parameter and says Hello
 * test with httpie:
 *     http http://localhost:8080
 *     http http://localhost:8080?name=John
 */
router.get('/', (req,res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  let name = req.query.name || '';
  res.write(`Hello ${name}`);
  res.end();
});

router.get('/api/v1/dogs', (req, res) => {
  res.write();
  res.end();
// send back all dogs
});

router.get('api/v1/dogs?id', (req, rest) =>{
  res.write();
  res.end();

});

// -----works but don't use?-------------
// router.get('/cowsay', (req,res) => {
//   res.statusCode = 200;
//   res.statusMessage = 'OK';
//   res.write('what does the cow say');
//   res.end();
// })
// ---------------------------------------

/**
 * POST Route (/data)
 * Accepts a JSON object and simply regurgitates it back to the browser
 * test with httpie:
 *     echo '{"title":"Go Home","content":"foobar"}' | http post http://localhost:8080/data
 */
router.post('/data', (req,res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.write( JSON.stringify(req.body) );
  res.end();
});

module.exports = {};