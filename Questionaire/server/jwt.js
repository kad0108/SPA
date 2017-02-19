var jwt = require('jwt-simple');
var payload = {foo: 'bar'};
var secret = 'kad';

var token = jwt.encode(payload, secret);

var decoded = jwt.decode(token, secret);

console.log(decoded);