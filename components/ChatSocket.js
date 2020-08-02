import { webSocket } from "rxjs/webSocket";

export default function ChatSocket({ subject }) {
  const webSocketSubject = webSocket("ws://" + location.host);
  webSocketSubject.subscribe(subject);

  return <div />;
}
