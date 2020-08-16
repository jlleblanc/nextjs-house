const { v4: uuidv4 } = require("uuid");
const WebSocket = require("ws");

const prepMessage = (message, username = "") => {
  const id = uuidv4();
  return `{"message": "${message}", "id": "${id}", "username": "${username}"}`;
};

const sendMessage = (ws, message, username) => {
  ws.send(prepMessage(message, username));
};

const broadcastMessage = (wss, message, username) => {
  wss.clients.forEach((client) => sendMessage(client, message, username));
};

exports.chatroom = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    let username = "";

    ws.on("message", (raw) => {
      const envelope = JSON.parse(raw);
      console.log("received: %s", raw);
      if (envelope.message) {
        broadcastMessage(wss, envelope.message, username);
      } else if (envelope.join) {
        username = envelope.join;
        broadcastMessage(wss, `${username} joined the chat`);
      }
    });

    sendMessage(ws, `Hi there, I am a WebSocket server`);
  });
};
