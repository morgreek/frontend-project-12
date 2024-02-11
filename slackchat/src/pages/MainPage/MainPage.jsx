import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ChannelList from '../../components/ChannelList';
import ChatWindow from "../../components/chatWindow";

import axios from 'axios';
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthorizationContext } from '../../hooks/useAuthorizationContext';

import { selectors as channelsSelectors, actions as channelsActions } from '../../slices/channelsSlice.js';
import { selectors as messagesSelectors, actions as messagesActions } from '../../slices/messagesSlice.js';

import getModalComponent from '../../components/modal/index'

const socket = io();

export default function MainPage() {
  const auth = useAuthorizationContext();
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState({});
  const channels = useSelector(channelsSelectors.selectAll);
  const [currentChannelId, setCurrentChannelId] = useState(1);
  const currentChannel = useSelector((state) => {
    return channelsSelectors.selectById(state, currentChannelId);
  });
  const channelMessages = useSelector(messagesSelectors.selectAll).filter(({ channelId }) => channelId === currentChannelId);

  const addChannel = (name) => {
    socket.emit('newChannel', { name });
  }

  const renameChannel = (id, name) => {
    socket.emit('renameChannel', {id, name});
  }

  const removeChannel = (id) => {
    socket.emit('removeChannel', {id});
    setCurrentChannelId(1);
  }

  const submitMessage = (message) => {
    socket.emit(
      'newMessage',
      { body: message, channelId: currentChannelId, username: auth.userData.username }
    );
  }

  const getHeaderRequest = () => {
    return auth?.userData?.token 
      ? { Authorization: `Bearer ${auth.userData.token}` }
      : {};
  }

  useEffect(() => {
    const getData = async () => {
      const { data } =  await axios.get('/api/v1/data', { headers: getHeaderRequest() });
      dispatch(channelsActions.addChannels(data.channels));
      dispatch(messagesActions.addMessages(data.messages));
    }

    getData();

    socket.connect();
    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addMessage(message));
    });
    socket.on('newChannel', (id) => {
      dispatch(channelsActions.addChannel(id));
    });
    socket.on('removeChannel', ({id}) => {
      dispatch(channelsActions.removeChannel(id));
    });
    socket.on('renameChannel', ({id, name}) => {
      dispatch(channelsActions.updateChannel({id, changes:{ name }}))
    });
    
  }, [auth.userData, dispatch, currentChannelId]);

  const renderModal = (parameters) => {
    const {
      modalCode,
      title,
      confirmButton,
      btnVariant,
      confirmText,
      channel,
      channels,
      confirmAction
    } = parameters;
    const ModalComponent = getModalComponent(modalCode);
    if (!ModalComponent) return null;

    return (
      <ModalComponent
        title={title}
        confirmButton={confirmButton}
        btnVariant={btnVariant}
        confirmText={confirmText}
        channel={channel}
        channels={channels}
        confirmAction={confirmAction}
        onHide={() => setModalState({})}
      />
    );
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelList 
          channels={channels}
          channel={currentChannel}
          showModal={setModalState}
          setActive={setCurrentChannelId}
          addChannel={addChannel}
          renameChannel={renameChannel}
          removeChannel={removeChannel}
        />
        <ChatWindow channel={currentChannel} messages={channelMessages} submitMessage={submitMessage}/>
      </Row>
      {renderModal(modalState)}
    </Container>
  );
}