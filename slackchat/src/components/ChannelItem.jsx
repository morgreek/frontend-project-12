import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const renderChannelButton = (parameters) => {
  const {
    id, name, selectChannel, variant,
  } = parameters;
  return (
    <Button
      className="w-100 rounded-0 text-start text-truncate"
      onClick={() => selectChannel(id)}
      type="button"
      variant={variant || null}
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );
};

const renderEditableChannel = (parameters) => {
  const {
    id, name, onRemoveChannel, onRenameChannel, selectChannel, t, variant,
  } = parameters;

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      {renderChannelButton({
        id, name, selectChannel, variant,
      })}

      <Dropdown.Toggle className="flex-grow-0" id="dropdown-split-basic" split variant={variant || null}>
        <span className="visually-hidden">{ t('channels.channelManage') }</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onRemoveChannel(id)}>{ t('remove') }</Dropdown.Item>
        <Dropdown.Item onClick={() => onRenameChannel(id)}>{ t('rename') }</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default function ChannelItem(props) {
  const {
    channel, currentChannel, onRemoveChannel, onRenameChannel, selectChannel,
  } = props;
  const { id, name, removable } = channel;
  const variant = id === currentChannel.id ? 'secondary' : null;

  const { t } = useTranslation();

  return (
    <li className="nav-item w-100" key={id}>
      {
        removable
          ? renderEditableChannel({
            id, name, onRemoveChannel, onRenameChannel, selectChannel, t, variant,
          })
          : renderChannelButton({
            id, name, selectChannel, variant,
          })
      }
    </li>
  );
}
