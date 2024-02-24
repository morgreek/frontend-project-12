import ConfirmModal from "./ConfirmModal";
import EditChannelModal from "./EditChannelModal";

const modals = {
  addChannel: EditChannelModal,
  editChannel: EditChannelModal,
  removeChannel: ConfirmModal,
};

const getModalByCode = (modalCode) => modals[modalCode];

export default getModalByCode;
