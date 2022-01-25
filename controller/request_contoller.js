const request = require('request');

request("http://localhost:8080/api/userapproval", { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});