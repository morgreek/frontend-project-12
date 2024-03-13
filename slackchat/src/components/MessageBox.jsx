import { useEffect, useRef } from 'react';

import useAuthorizationContext from '../hooks/useAuthorizationContext';

const MessagesBox = ({ messages }) => {
  const messagesRef = useRef();
  const auth = useAuthorizationContext();
  useEffect(() => {
    const { current } = messagesRef;

    if (!current) return;

    const { clientHeight, scrollHeight } = current;
    if (scrollHeight > clientHeight) {
      current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages.length]);

  const mapMessages = ({ body, id, username }) => {
    const classes = ['text-break', 'mb-2'];
    if (auth?.userData?.username === username) {
      classes.push('bg-light');
    }

    return (
      <div className={classes.join(' ')} key={id}>
        <b>{`${username}: `}</b>
        {body}
      </div>
    );
  };

  return (
    <div className="chat-messages overflow-auto px-5 " id="messages-box" ref={messagesRef}>
      {messages.map(mapMessages)}
    </div>
  );
};

export default MessagesBox;
