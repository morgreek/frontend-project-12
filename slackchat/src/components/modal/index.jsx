import ChannelModal from './ChannelModal';
import ConfirmModal from './ConfirmModal';

const modals = {
  addChannel: ChannelModal,
  editChannel: ChannelModal,
  removeChannel: ConfirmModal,
};

const getModalByCode = (modalCode) => modals[modalCode];

export default getModalByCode;
