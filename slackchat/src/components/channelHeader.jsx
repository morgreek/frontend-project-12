export default function ChannelHeader({channel, messages}) {

    return (
        <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0"><b>{`# ${channel?.name}`}</b></p>
            <span className="text-muted">{`${messages.length} сообщений`}</span>
        </div>
    )
}