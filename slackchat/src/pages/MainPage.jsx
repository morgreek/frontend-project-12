import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import apiRoutes from '../api/api';
import ChannelList from '../components/ChannelList';
import ChatWindow from '../components/chatWindow';
import getModalComponent from '../components/modal/index';
import useAuthorizationContext from '../hooks/useAuthorizationContext';
import useSelectorChannel from '../hooks/useSelectorChannel';
import routes from '../routes';
import { actions as channelsActions, selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { actions as messagesActions, selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { actions as modalsActions } from '../slices/modalSlice';

const MainPage = ({ socket }) => {
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const auth = useAuthorizationContext();
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState({});
  const modalCode = useSelector((state) => state.modals.modalCode);
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelectorChannel();
  const currentChannel = useSelector((state) => channelsSelectors
    .selectById(state, currentChannelId));
  const channelMessages = useSelector(messagesSelectors.selectAll)
    .filter(({ channelId }) => channelId === currentChannelId);

  const addChannel = (name) => {
    socket.emit('newChannel', { name }, (response) => {
      const { status, data: { id } } = response;
      if (status === 'ok') {
        dispatch(channelsActions.setCurrentChannelId(id));
        toast.info(t('channels.channelAdded'));
      }
    });
  };

  const renameChannel = (id, name) => {
    socket.emit('renameChannel', { id, name }, ({ status }) => {
      if (status === 'ok') {
        toast.info(t('channels.channelRenamed'));
      }
    });
  };

  const removeChannel = (id) => {
    socket.emit('removeChannel', { id }, ({ status }) => {
      if (status === 'ok') {
        if (currentChannelId === id) {
          dispatch(channelsActions.setCurrentChannelId(1));
        }
        dispatch(channelsActions.removeChannel(id));
        toast.info(t('channels.channelRemoved'));
      }
    });
  };

  const submitMessage = (message) => {
    socket.emit(
      'newMessage',
      { body: message, channelId: currentChannelId, username: auth.userData.username },
    );
  };

  useEffect(() => {
    const getData = async () => {
      const headers = auth?.userData?.token
        ? { Authorization: `Bearer ${auth.userData.token}` }
        : null;
      try {
        const { data } = await axios.get(apiRoutes.data, { headers });
        dispatch(channelsActions.addChannels(data.channels));
        dispatch(messagesActions.addMessages(data.messages));
      } catch (e) {
        if (e.response.status === 401) {
          auth.setLogin(null);
          localStorage.clear();
          navigateTo(routes.login);
          return;
        }

        toast.error(t('errors.connection'));
      }
    };

    getData();
  }, [auth.userData, dispatch, currentChannelId, t]);

  const renderModal = (code, parameters) => {
    const {
      btnVariant,
      channel,
      channels: channelsList,
      confirmAction,
      confirmButton,
      confirmText,
      title,
    } = parameters;
    const ModalComponent = getModalComponent(code);
    if (!ModalComponent) return null;

    return (
      <ModalComponent
        btnVariant={btnVariant}
        channel={channel}
        channels={channelsList}
        confirmAction={confirmAction}
        confirmButton={confirmButton}
        confirmText={confirmText}
        onHide={() => dispatch(modalsActions.clearModalCode())}
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
          showModal={setModalState}
        />
        <ChatWindow
          channel={currentChannel}
          messages={channelMessages}
          submitMessage={submitMessage}
        />
      </Row>
      {renderModal(modalCode, modalState)}
    </Container>
  );
};

export default MainPage;
