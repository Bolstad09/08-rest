'use strict';

const parser = require('./parser.js');

const router = module.exports = {};

router.routes = {};

const methods = ['GET','PUT','PATCH','POST','DELETE'];

methods.forEach( (method) => {
  router.routes[method] = {};
  router[method.toLowerCase()] = function(path, callback) {
    router.routes[method][path] = callback;
  };
});

router.route = (req,res) => {
  return parser(req)
    .then(req => {
      let handler = router.routes[req.method][req.parsed.pathname];
      if (handler) {
        return handler(req,res);
      }
    })
    .catch(err => {
      res.statusCode = 400;
      res.statusMessage = 'failed request';
      res.write(`failed request (${req.parsed.pathname})`);
      res.end();
    });

};
