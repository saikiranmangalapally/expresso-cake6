const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  // Use /tmp/data.json in Vercel production
  const dataPath = path.join("/tmp", "data.json");
  const fallbackPath = path.join(process.cwd(), "data.json");

  // Copy seed data to /tmp if it doesn't exist yet
  if (!fs.existsSync(dataPath) && fs.existsSync(fallbackPath)) {
    try { fs.copyFileSync(fallbackPath, dataPath); } catch (e) {}
  }

  if (req.method === 'GET') {
    fs.readFile(fs.existsSync(dataPath) ? dataPath : fallbackPath, "utf8", (err, data) => {
      if (err) {
        return res.status(200).json({});
      }
      return res.status(200).send(data);
    });
  } 
  else if (req.method === 'POST') {
    let body = "";
    req.on("data", (chunk) => { body += chunk.toString(); });
    req.on("end", () => {
      fs.writeFile(dataPath, body, (err) => {
        if (err) {
          return res.status(500).send("Error saving data");
        }
        return res.status(200).send("Data saved");
      });
    });
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
