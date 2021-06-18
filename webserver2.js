const HTTP = require("http");
const URL = require("url");
const fs = require("fs");
HTTP.createServer((req, res) => {
  const { path } = URL.parse(req.url);
  if (/\.html$/.test(path)) {
    const data = fs.readFileSync(`.${path}`);
    res.end(data);
  } else {
    res.end();
  }
}).listen(81, () => {
  console.log("Your are application already running here http://localhost:81");
});
