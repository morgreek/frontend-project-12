import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ChannelList from "../../components/channelList";
import ChatWindow from "../../components/chatWindow";

import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectors as channelsSelectors, actions as channelsActions } from '../../slices/channelsSlice.js';
import { selectors as messagesSelectors, actions as messagesActions } from '../../slices/messagesSlice.js';

export default function MainPage() {
    const getHeader = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
      }
      return;
    }

    const channels = useSelector((state) => {
      const allChannels = channelsSelectors.selectAll(state);
      return allChannels;
    });

    const dispatch = useDispatch();

    useEffect(() => {
      const getData = async () => {
        const { data } =  await axios.get('/api/v1/data', { headers: getHeader() });
        dispatch(channelsActions.addChannels(data.channels));
        dispatch(messagesActions.addMessages(data.messages));
      }
      getData();
    }, []);

    return (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <ChannelList>
            {channels.map(({id, name}) => {
              return (
                <li className="nav-item w-100" key={id}>
                  <button
                    className={`w-100 rounded-0 text-start btn`}
                    type="button"
                  >
                    <span className="me-1">#</span>
                    {name}
                  </button>
                </li>
              )
            })}
          </ChannelList>
          <ChatWindow />
        </Row>
      </Container>
    );
}