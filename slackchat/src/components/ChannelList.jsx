import Col from 'react-bootstrap/Col';
import ChannelItem from './ChannelItem';
import { useTranslation } from 'react-i18next';

export default function ChannelList(props) {
    const { t } = useTranslation();

    const {
        channel,
        channels,
        setActive,
        showModal,
        addChannel,
        renameChannel,
        removeChannel,
     } = props;

    const onAddChannel = () => {
        showModal({
            modalCode:'addChannel',
            title: t('channels.addChannel'),
            channels,
            confirmAction: addChannel,
        })
    }

    const onRenameChannel = (id) => {
        const currentChannel = channels.filter((item) => item.id === id)[0];

        showModal({
            modalCode:'editChannel',
            title: t('channels.renameChannel'),
            channel: currentChannel,
            channels,
            confirmAction: renameChannel,
        });
    }

    const onRemoveChannel = (id) => {
        function removeFunc() {
            removeChannel(id)
        }
        showModal({
            modalCode:'removeChannel',
            title: t('channels.removeChannel'),
            confirmText: t('areYouSure'),
            btnVariant: 'danger',
            confirmButton: t('remove'),
            confirmAction: removeFunc
        });
    }
    
    const renderChannels = (channels, currentChannel) => {
        const channelMap = (channel) => (
             <ChannelItem 
                key={channel?.id}
                channel={channel}
                currentChannel={currentChannel}
                selectChannel={setActive}
                onRenameChannel={onRenameChannel}
                onRemoveChannel={onRemoveChannel}
            />
        );
        return (
            <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                { channels?.map(channelMap) }
            </ul>
        );
    }

    return (
        <>
            <Col md={2} className="col-4 border-end pt-5 px-0 bg-light">
                <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                    <span>{t('channels.channelsTitle')}</span>
                    <button onClick={() => onAddChannel()} type="button" className="p-0 text-primary btn btn-group-vertical">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" data-darkreader-inline-fill="" style={{ '--darkreader-inline-fill': 'currentColor;' }}>
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        <span className="visually-hidden">+</span>
                    </button>
                </div>
                {renderChannels(channels, channel)}
            </Col>
        </>
    );
}