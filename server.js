// Modules Import
const http = require("http");
const fs = require("fs");
const path = require("path");

// Create Server
const port = 3000;

const server = http.createServer((req, res) => {
  // File Path Determine
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );
  console.log(filePath);

  //  MIME Type Set Karna

  const extName = String(path.extname(filePath)).toLowerCase();

  const mimeType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "text/png",
  };

  const contentType = mimeType[extName] || "application/octet-stream";

  // File Read Karna Aur Response Dena

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(`404: File Not Found BRoooooo..!`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

//  Server Ko Start Karna

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
