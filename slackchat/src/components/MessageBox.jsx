import { useEffect, useRef } from 'react';

export default function MessagesBox({messages}) {
    const messagesRef = useRef();
    useEffect(() => {
        const { current } = messagesRef;
 
        if (!current) return;
 
        const { scrollHeight, clientHeight } = current;
        if (scrollHeight > clientHeight) {
            current.scrollTop = scrollHeight - clientHeight;
        }
    }, [messages.length]);

    const mapMessages = ({ id, body, username }) => {
        return (
            <div id={id}  className="text-break mb-2">
                <b>{`${username}: `}</b>
                {body}
            </div>
        );
    }

    return (
        <div id="messages-box" ref={messagesRef} className="chat-messages overflow-auto px-5 ">
            {messages.map(mapMessages)}
        </div>
    );
}