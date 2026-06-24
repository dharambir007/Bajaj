import http from "http";
import handler from "./api/bfhl.js";

const PORT = 3001;

function createRes(nodeRes) {
  const headers = {};
  return {
    statusCode: 200,
    setHeader(k, v) { headers[k] = v; nodeRes.setHeader(k, v); },
    status(code) { this.statusCode = code; nodeRes.statusCode = code; return this; },
    json(data) {
      nodeRes.setHeader("Content-Type", "application/json");
      nodeRes.end(JSON.stringify(data));
    },
    end(...args) { nodeRes.end(...args); },
  };
}

const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    try { req.body = body ? JSON.parse(body) : {}; }
    catch { req.body = {}; }
    handler(req, createRes(res));
  });
});

server.listen(PORT, () => {
  console.log(`Backend running → http://localhost:${PORT}`);
  console.log(`Test:  POST http://localhost:${PORT}/bfhl`);
});
