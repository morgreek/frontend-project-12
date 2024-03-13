import i18next from 'i18next';
import filter from 'leo-profanity';
import { initReactI18next } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import App from './App';
import useSelectorChannel from './hooks/useSelectorChannel';
import resources from './locales/index.js';
import { actions as channelsActions } from './slices/channelsSlice';
import { actions as messagesActions } from './slices/messagesSlice';

const Init = () => {
  const i18nInstance = i18next.createInstance();
  i18nInstance
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      resources,
    });

  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('fr'));
  filter.add(filter.getDictionary('ru'));

  const socket = io();
  const dispatch = useDispatch();

  const channelId = useSelectorChannel();

  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    dispatch(channelsActions.addChannel(channel));
  });
  socket.on('removeChannel', ({ id }) => {
    if (channelId === id) {
      dispatch(channelsActions.setCurrentChannelId(1));
    }
    dispatch(channelsActions.removeChannel(id));
  });
  socket.on('renameChannel', ({ id, name }) => {
    dispatch(channelsActions.updateChannel({ changes: { name }, id }));
  });

  return <App i18n={i18nInstance} socket={socket} />;
};

export default Init;
