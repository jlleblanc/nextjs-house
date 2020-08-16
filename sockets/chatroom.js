const { v4: uuidv4 } = require("uuid");
const WebSocket = require("ws");

exports.chatroom = (server) => {
  const wss = new WebSocket.Server({ server });

  const sendMessage = (ws, message) => {
    const id = uuidv4();
    ws.send(`{"message": "${message}", "id": "${id}"}`);
  };

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
};
