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

// On Vercel, we can't write to __dirname/data.json. Use /tmp/data.json as a fallback.
const isVercel = process.env.VERCEL === "1";
let dataPath = path.join(root, "data.json");
if (isVercel) {
  const tmpPath = path.join("/tmp", "data.json");
  // Copy seed data to /tmp if it doesn't exist yet
  if (!fs.existsSync(tmpPath) && fs.existsSync(dataPath)) {
    fs.copyFileSync(dataPath, tmpPath);
  }
  dataPath = tmpPath;
}

const requestHandler = (request, response) => {
  let urlPath = decodeURIComponent((request.url || "/").split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";

  // API Endpoints for Data Persistence
  if (urlPath === "/api/data" && request.method === "GET") {
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
    request.on("data", (chunk) => { body += chunk.toString(); });
    request.on("end", () => {
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

  // If we are on Vercel, static files are handled by the CDN (handle: filesystem).
  // If a request reaches here, it means the file wasn't found by the CDN.
  const filePath = path.normalize(path.join(root, urlPath));
  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
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
};

if (isVercel) {
  module.exports = requestHandler;
} else {
  http.createServer(requestHandler).listen(port, "127.0.0.1", () => {
    console.log(`Expresso Cake preview running at http://127.0.0.1:${port}/`);
  });
}
