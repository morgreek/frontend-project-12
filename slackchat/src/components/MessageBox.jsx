export default function MessagesBox({messages}) {
    const mapMessages = ({ id, body, username }) => {
        return (
            <div id={id} className="text-break mb-2">
                <b>{`${username}: `}</b>
                {body}
            </div>
        );
    }

    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
            {messages.map(mapMessages)}
        </div>
    );
}