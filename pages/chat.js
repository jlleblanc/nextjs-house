import React, { useState, useEffect } from "react";

export default function Chat({ username, subject }) {
  let [messages, setMessages] = useState([]);

  useEffect(() => {
    subject.subscribe((json) => {
      let newMessages = [...messages];
      newMessages.push(json);
      setMessages(newMessages);
    });

    // TODO: figure out how to make this work
    // subject.next({ join: username });
  });

  return (
    <div>
      {messages.map((message) => (
        <div className="card" key={message.id}>
          {message.message}
        </div>
      ))}
      <input name="chatterbox" placeholder="type your message here..." />
      <style jsx>
        {`
          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }
        `}
      </style>
    </div>
  );
}
