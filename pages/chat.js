import React, { useState, useEffect } from "react";

export default function Chat({ subject }) {
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    subject.subscribe((json) => {
      let newMessages = [...messages];
      newMessages.push(json);
      setMessages(newMessages);
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
