import React, { useState, useEffect } from "react";

// hack
let storedUsername;

export default function Chat({ subject, username }) {
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    subject.subscribe((json) => {
      let newMessages = [...messages];
      newMessages.push(json);
      setMessages(newMessages);
    });

    if (storedUsername) return;
    storedUsername = username;

    // TODO: this is executing, but it is not actually going back
    // to the server. How frustrating! Maybe I need a separate
    // subject for submitting to the server?? Or is there possibly
    // a way for me to use the browser's WebSocket object directly??
    subject.next({
      join: username,
      message: "joe has joined",
      id: username,
    });
  });

  return (
    <div>
      {messages.map((message) => (
        <div className="card" key={message.id}>
          {message.message}
        </div>
      ))}
      <input name="chatterbox" placeholder="type your message here..." />
    </div>
  );
}
