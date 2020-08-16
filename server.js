// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { chatroom } = require("./sockets/chatroom");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = dev ? 3000 : 80;

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:" + port);
  });

  chatroom(server);
});
