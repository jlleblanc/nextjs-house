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
    // here's what seems to be going on: we are in the useEffect hook
    // which is being run as soon as the component is ready. When we
    // hit this line, the subject changes, which causes another render
    // before we even finish here.
    //
    // Ideally, I don't want to set up this websocket connection
    // within React and instead want to pull something from the
    // global scope. This might seem like a terrible thing in most
    // programming contexts, but here it helps us avoid the problem
    // where we are effectively re-rendering our subject every time.
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
