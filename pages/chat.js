import dynamic from "next/dynamic";

export default function Chat() {
  const ChatSocket = dynamic(() => import("../components/ChatSocket"));

  return (
    <div>
      <ChatSocket />
    </div>
  );
}
