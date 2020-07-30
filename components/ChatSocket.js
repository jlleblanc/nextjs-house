import Websocket from "react-websocket";

export default function ChatSocket() {
  const handleData = (data) => {
    console.log(data);
  };

  return (
    <Websocket
      url={"ws://" + location.host}
      onMessage={handleData.bind(this)}
    />
  );
}
