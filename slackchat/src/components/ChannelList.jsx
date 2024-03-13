import { useEffect, useRef } from 'react';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';

import ChannelItem from './ChannelItem';

const ChannelList = (props) => {
  const { t } = useTranslation();

  const currentChannelRef = useRef();

  const {
    addChannel,
    channel,
    channels,
    removeChannel,
    renameChannel,
    showModal,
  } = props;

  const scrollToChannel = (ref) => {
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => scrollToChannel(currentChannelRef), [channel]);

  const onAddChannel = () => {
    showModal({
      channels,
      confirmAction: addChannel,
      modalCode: 'addChannel',
      title: t('channels.addChannel'),
    });
  };

  const onRenameChannel = (id) => {
    const currentChannel = channels.filter((item) => item.id === id)[0];

    showModal({
      channel: currentChannel,
      channels,
      confirmAction: renameChannel,
      modalCode: 'editChannel',
      title: t('channels.renameChannel'),
    });
  };

  const onRemoveChannel = (id) => {
    function removeFunc() {
      removeChannel(id);
    }
    showModal({
      btnVariant: 'danger',
      confirmAction: removeFunc,
      confirmButton: t('remove'),
      confirmText: t('areYouSure'),
      modalCode: 'removeChannel',
      title: t('channels.removeChannel'),
    });
  };

  const renderChannels = (channelsList, currentChannel) => {
    const channelMap = (item) => (
      <ChannelItem
        channel={item}
        currentChannel={currentChannel}
        key={item?.id}
        onRemoveChannel={onRemoveChannel}
        onRenameChannel={onRenameChannel}
        reffer={item.id === currentChannel?.id ? currentChannelRef : null}
      />
    );
    //
    return (
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelsList?.map(channelMap)}
      </ul>
    );
  };

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{ t('channels.channelsTitle') }</b>
        <button
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => onAddChannel()}
          type="button"
        >
          <svg
            data-darkreader-inline-fill=""
            fill="currentColor"
            height="20"
            style={{ '--darkreader-inline-fill': 'currentColor;' }}
            viewBox="0 0 16 16"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      {renderChannels(channels, channel)}
    </Col>
  );
};

export default ChannelList;
