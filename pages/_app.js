import dynamic from "next/dynamic";
import { Subject } from "rxjs";

function HouseOfAsdellLeBlanc({ Component, pageProps }) {
  const ChatSocket = dynamic(() => import("../components/ChatSocket"));
  const chatSubject = new Subject();

  pageProps.chatSubject = chatSubject;

  return (
    <div>
      <Component {...pageProps} />
      <ChatSocket subject={chatSubject} />
    </div>
  );
}

export default HouseOfAsdellLeBlanc;
