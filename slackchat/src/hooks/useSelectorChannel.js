import { useSelector } from 'react-redux';

const useSelectorChannel = () => useSelector((state) => state.channels.currentChannelId);

export default useSelectorChannel;
