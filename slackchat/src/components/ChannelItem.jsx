import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

const renderChannelButton = (parameters) => {
    const {id, name, variant, selectChannel} = parameters;
    return (
        <Button
            className={`w-100 rounded-0 text-start btn text-truncate`}
            variant={variant ? variant : null}
            type="button"
            onClick={() => selectChannel(id)}
        >
            <span className="me-1">#</span>
            {name}
        </ Button>
    );  
}

const renderEditableChannel = (parameters) => {
    const {id, name, variant, selectChannel, onRenameChannel, onRemoveChannel } = parameters;

    return (
        <Dropdown as={ButtonGroup} className="d-flex">
          {renderChannelButton({id, name, variant, selectChannel})}

          <Dropdown.Toggle split variant={variant ? variant : null} className="flex-grow-0" id="dropdown-split-basic">
            <span className="visually-hidden">{'Test'}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onRemoveChannel(id)}>{'Удалить'}</Dropdown.Item>
            <Dropdown.Item onClick={() => onRenameChannel(id)}>{'Переименовать'}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    );
}

export default function ChannelItem(props) {
    const {channel, currentChannel, selectChannel, onRenameChannel, onRemoveChannel} = props
    const {id, name, removable} = channel;
    const variant = id === currentChannel.id ? 'secondary' : null;

    return (
        <li key={id} className="nav-item w-100">
            {
                removable
                    ? renderEditableChannel({id, name, variant, selectChannel, onRenameChannel, onRemoveChannel})
                    : renderChannelButton({id, name, variant, selectChannel})
            }
        </li> 
    );
}