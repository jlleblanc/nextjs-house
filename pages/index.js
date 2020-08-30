import React, { useState, useEffect } from "react";
import Head from "next/head";
import Chat from "./chat";
import Login from "./login";

export default function Home({ chatSubject }) {
  const [username, setUsername] = useState();

  useEffect(() => {
    // TODO: this is executing, but it is not actually going back
    // to the server. How frustrating! Maybe I need a separate
    // subject for submitting to the server?? Or is there possibly
    // a way for me to use the browser's WebSocket object directly??
    if (username) {
      chatSubject.next({ join: username });
    }
  });

  const content = username ? (
    <Chat subject={chatSubject} />
  ) : (
    <Login enterUsernameHandler={setUsername} />
  );

  return (
    <div className="container">
      <Head>
        <title>House of Asdell-LeBlanc</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{content}</main>

      <footer>🐻🐻</footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 3rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
