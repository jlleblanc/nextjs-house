// server.js
const { createServer } = require("http");
const { parse } = require("url");
const { v4: uuidv4 } = require("uuid");
const next = require("next");
const WebSocket = require("ws");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = dev ? 3000 : 80;

const sendMessage = (ws, message) => {
  const id = uuidv4();
  ws.send(`{"message": "${message}", "id": "${id}"}`);
};

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:" + port);
  });

  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      //log the received message and send it back to the client
      console.log("received: %s", message);
      sendMessage(ws, `Hello, you sent -> ${message}`);
    });

    sendMessage(ws, `Hi there, I am a WebSocket server`);
  });
});
