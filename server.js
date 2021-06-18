const HTTP = require("http");
const URL = require("url");
const router = require("./router");
HTTP.createServer((req, res) => {
  // 允许跨域
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Credentials", true);
  const { path } = URL.parse(req.url);
  if (!router[path]) {
    res.statusCode = 404;
    res.end();
    return;
  }
  if (req.method == "GET") {
    router[path](req, res);
  } else if (req.method == "POST") {
    let dataStr = "";
    req.on("data", function (chunk) {
      dataStr += chunk;
    });
    req.on("end", function () {
      dataStr = dataStr && JSON.parse(dataStr);
      req.body = dataStr;
      router[path](req, res);
    });
  }
}).listen(3002,function(){
    console.log("Your are application already running here: http://localhost:3002");
});
