import Col from "react-bootstrap/Col";

import MessagesBox from "./MessageBox";
import MessageSendField from "./MessageSendField";
import ChannelHeader from "./channelHeader";

export default function ChatWindow({ channel, messages, submitMessage }) {
  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChannelHeader channel={channel} messages={messages} />
        <MessagesBox messages={messages} />
        <MessageSendField submitMessage={submitMessage} />
      </div>
    </Col>
  );
}
