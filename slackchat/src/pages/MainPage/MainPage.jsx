import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ChannelList from "../../components/channelList";
import ChatWindow from "../../components/chatWindow";

import axios from 'axios';
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthorizationContext } from '../../hooks/useAuthorizationContext';

import { selectors as channelsSelectors, actions as channelsActions } from '../../slices/channelsSlice.js';
import { selectors as messagesSelectors, actions as messagesActions } from '../../slices/messagesSlice.js';

const socket = io();

export default function MainPage() {
  const getHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return;
  }
  const [currentChannelId, setCurrentChannelId] = useState(1);
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = useSelector((state) => (
    channelsSelectors.selectById(state, currentChannelId)
  ));
  const channelMessages = useSelector(messagesSelectors.selectAll).filter(({ channelId }) => channelId === currentChannelId);

  const auth = useAuthorizationContext();
  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });
  const submitMessage = (message) => socket.emit(
    'newMessage',
    { body: message, channelId: currentChannelId, username: auth.userData.username },
  );

  useEffect(() => {
    const getData = async () => {
      const { data } =  await axios.get('/api/v1/data', { headers: getHeader() });
      dispatch(channelsActions.addChannels(data.channels));
      dispatch(messagesActions.addMessages(data.messages));
    }
    getData();
  }, [auth.userData, dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelList channels={channels} />
        <ChatWindow channel={currentChannel} messages={channelMessages} submitMessage={submitMessage}/>
      </Row>
    </Container>
  );
}