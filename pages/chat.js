import React, { useState, useEffect } from "react";

// This is a dirty-ish hack, but pure functional programming here hasn't delivered.
let socket;

function setupSocket(username) {
  socket = new WebSocket(`ws://${location.host}`);
  socket.onopen = () => {
    socket.send(JSON.stringify({ join: username }));
  };
}

export default function Chat({ username }) {
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) setupSocket(username);

    socket.onmessage = (message) => {
      let newMessages = [...messages];
      newMessages.push(JSON.parse(message.data));
      setMessages(newMessages);
    };
  });

  let sendMessage = (e) => {
    e.preventDefault();
    let input = e.target.getElementsByTagName("input")[0];
    socket.send(JSON.stringify({ message: input.value }));
    input.value = "";
  };

  return (
    <div>
      {messages.map((message) => (
        <div className="card" key={message.id}>
          {message.username ? `${message.username}:` : ""} {message.message}
        </div>
      ))}
      <form onSubmit={sendMessage}>
        <input name="chatterbox" placeholder="type your message here..." />
        <button>Send</button>
      </form>
    </div>
  );
}
