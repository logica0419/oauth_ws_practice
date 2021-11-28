import { VFC } from "react";
import { WsMessage } from "./pb/ws/message";
import "./Message.css";

interface MessageProps {
  message: WsMessage;
}

const Message: VFC<MessageProps> = (props) => {
  return (
    <>
      <b className="mes-id">{props.message.UserID} :</b>
      <div className="mes-body">{props.message.Message}</div>
    </>
  );
};

export default Message;
