const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 8088;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

http
  .createServer((request, response) => {
    let urlPath = decodeURIComponent(request.url.split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";

    const filePath = path.normalize(path.join(root, urlPath));
    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    // API Endpoints for Data Persistence
    if (urlPath === "/api/data" && request.method === "GET") {
      const dataPath = path.join(root, "data.json");
      fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(JSON.stringify({}));
          return;
        }
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(data);
      });
      return;
    }

    if (urlPath === "/api/data" && request.method === "POST") {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
      request.on("end", () => {
        const dataPath = path.join(root, "data.json");
        fs.writeFile(dataPath, body, (err) => {
          if (err) {
            response.writeHead(500);
            response.end("Error saving data");
            return;
          }
          response.writeHead(200);
          response.end("Data saved");
        });
      });
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      response.end(data);
    });
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`SweetCrust preview running at http://127.0.0.1:${port}/`);
  });
