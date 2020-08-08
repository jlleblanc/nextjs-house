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
    let username = "";

    ws.on("message", (raw) => {
      const envelope = JSON.parse(raw);
      console.log("received: %s", raw);
      if (envelope.message) {
        // TODO: this should send to *all* clients
        sendMessage(ws, `Hello, you sent -> ${envelope.message}`);
      } else if (envelope.join) {
        // This is someone joining the chat
        // TODO: this should send to *all* clients
        username = envelope.join;
        sendMessage(ws, `${username} joined the chat`);
      }
    });

    sendMessage(ws, `Hi there, I am a WebSocket server`);
  });
});
