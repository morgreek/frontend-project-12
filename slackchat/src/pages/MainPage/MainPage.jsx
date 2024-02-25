import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

import apiRoutes from '../../api/api';
import ChannelList from '../../components/ChannelList';
import ChatWindow from '../../components/chatWindow';
import getModalComponent from '../../components/modal/index';
import useAuthorizationContext from '../../hooks/useAuthorizationContext';
import { actions as channelsActions, selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { actions as messagesActions, selectors as messagesSelectors } from '../../slices/messagesSlice.js';

const socket = io();

const MainPage = () => {
  const { t } = useTranslation();
  const auth = useAuthorizationContext();
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState({});
  const channels = useSelector(channelsSelectors.selectAll);
  const [currentChannelId, setCurrentChannelId] = useState(1);
  const [changeChannel, setChangeChannel] = useState(false);
  const currentChannel = useSelector((state) => channelsSelectors
    .selectById(state, currentChannelId));
  const channelMessages = useSelector(messagesSelectors.selectAll)
    .filter(({ channelId }) => channelId === currentChannelId);

  const addChannel = (name) => {
    setChangeChannel(true);
    socket.emit('newChannel', { name });
  };

  const renameChannel = (id, name) => {
    socket.emit('renameChannel', { id, name });
  };

  const removeChannel = (id) => {
    socket.emit('removeChannel', { id });
    if (currentChannelId === id) {
      setCurrentChannelId(1);
    }
  };

  const submitMessage = (message) => {
    socket.emit(
      'newMessage',
      { body: message, channelId: currentChannelId, username: auth.userData.username },
    );
  };

  const getHeaderRequest = () => (auth?.userData?.token
    ? { Authorization: `Bearer ${auth.userData.token}` }
    : {});

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(apiRoutes.data, { headers: getHeaderRequest() });
      dispatch(channelsActions.addChannels(data.channels));
      dispatch(messagesActions.addMessages(data.messages));
    };

    getData();

    socket.removeAllListeners();
    socket.connect();
    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
      if (changeChannel) {
        setCurrentChannelId(channel.id);
        setChangeChannel(false);
      }
      toast.info(t('channels.channelAdded'));
    });
    socket.on('removeChannel', ({ id }) => {
      if (id === currentChannelId) {
        setCurrentChannelId(1);
      } else {
        dispatch(channelsActions.removeChannel(id));
        toast.info(t('channels.channelRemoved'));
      }
    });
    socket.on('renameChannel', ({ id, name }) => {
      dispatch(channelsActions.updateChannel({ changes: { name }, id }));
      toast.info(t('channels.channelRenamed'));
    });
  }, [auth.userData, dispatch, currentChannelId, changeChannel, getHeaderRequest, t]);

  const renderModal = (parameters) => {
    const {
      btnVariant,
      channel,
      channels: channelsList,
      confirmAction,
      confirmButton,
      confirmText,
      modalCode,
      title,
    } = parameters;
    const ModalComponent = getModalComponent(modalCode);
    if (!ModalComponent) return null;

    return (
      <ModalComponent
        btnVariant={btnVariant}
        channel={channel}
        channels={channelsList}
        confirmAction={confirmAction}
        confirmButton={confirmButton}
        confirmText={confirmText}
        onHide={() => setModalState({})}
        title={title}
      />
    );
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelList
          addChannel={addChannel}
          channel={currentChannel}
          channels={channels}
          removeChannel={removeChannel}
          renameChannel={renameChannel}
          setActive={setCurrentChannelId}
          showModal={setModalState}
        />
        <ChatWindow
          channel={currentChannel}
          messages={channelMessages}
          submitMessage={submitMessage}
        />
      </Row>
      {renderModal(modalState)}
    </Container>
  );
};

export default MainPage;
