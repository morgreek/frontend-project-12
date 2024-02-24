import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const renderChannelButton = (parameters) => {
    const {id, name, variant, selectChannel} = parameters;
    return (
        <Button
            className={`w-100 rounded-0 text-start text-truncate`}
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
    const {id, name, variant, selectChannel, onRenameChannel, onRemoveChannel, t } = parameters;

    return (
        <Dropdown as={ButtonGroup} className="d-flex">
          {renderChannelButton({id, name, variant, selectChannel})}

          <Dropdown.Toggle split variant={variant ? variant : null} className="flex-grow-0" id="dropdown-split-basic">
            <span className="visually-hidden">{ t('channels.channelManage') }</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onRemoveChannel(id)}>{ t('remove') }</Dropdown.Item>
            <Dropdown.Item onClick={() => onRenameChannel(id)}>{ t('rename') }</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    );
}

export default function ChannelItem(props) {
    const {channel, currentChannel, selectChannel, onRenameChannel, onRemoveChannel} = props
    const {id, name, removable} = channel;
    const variant = id === currentChannel.id ? 'secondary' : null;

    const { t } = useTranslation();

    return (
        <li key={id} className="nav-item w-100">
            {
                removable
                    ? renderEditableChannel({id, name, variant, selectChannel, onRenameChannel, onRemoveChannel, t})
                    : renderChannelButton({id, name, variant, selectChannel})
            }
        </li> 
    );
}