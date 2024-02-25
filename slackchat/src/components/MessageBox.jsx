import { useEffect, useRef } from 'react';

const MessagesBox = ({ messages }) => {
  const messagesRef = useRef();
  useEffect(() => {
    const { current } = messagesRef;

    if (!current) return;

    const { clientHeight, scrollHeight } = current;
    if (scrollHeight > clientHeight) {
      current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages.length]);

  const mapMessages = ({ body, id, username }) => (
    <div className="text-break mb-2" id={id}>
      <b>{`${username}: `}</b>
      {body}
    </div>
  );

  return (
    <div className="chat-messages overflow-auto px-5 " id="messages-box" ref={messagesRef}>
      {messages.map(mapMessages)}
    </div>
  );
};

export default MessagesBox;
