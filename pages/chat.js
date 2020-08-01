import dynamic from "next/dynamic";

export default function Chat({ username }) {
  const ChatSocket = dynamic(() => import("../components/ChatSocket"));

  return (
    <div>
      <ChatSocket />
      {username}
    </div>
  );
}
