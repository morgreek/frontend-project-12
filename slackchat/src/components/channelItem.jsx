export default function ChannelItem({id, name}) {
    return (
        <li key={id} className="nav-item w-100">
            <button
                className={`w-100 rounded-0 text-start btn`}
                type="button"
            >
            <span className="me-1">#</span>
            {name}
            </button>
        </li> 
    );
}