import React, { useState } from "react";

export default function Chat({ username, subject }) {
  let [messages, setMessages] = useState([]);

  if (subject) {
    subject.subscribe((json) => {
      console.log("in component", json.message);
      let newMessages = [...messages];
      newMessages.push(json.message);
      setMessages(newMessages);
    });
  }

  return (
    <div>
      <div className="card">{username} has entered the chat</div>
      {messages.map((message) => (
        <div className="card">{message}</div>
      ))}
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
