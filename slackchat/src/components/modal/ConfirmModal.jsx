import { Form, Modal } from 'react-bootstrap';
import ConfirmButtons from './ConfirmButtons';
import { useTranslation } from 'react-i18next';

export default function ConfirmModal ({children, ...rest}) {
    const { t } = useTranslation();
    const {
        title,
        confirmText,
        confirmButton,
        btnVariant,
        onHide,
        confirmAction,
    } = rest;

    const parameters = {
        confirmButton: {
            name: confirmButton ?? t('send'),
            variant: btnVariant ?? 'primary',
        },
        cancelButton: {
            name: t('cancel'),
            variant: 'secondary',
        }
    };

    const sumbitHandler = (e) => {
        e.preventDefault();
        confirmAction()
        onHide();
    }

    return (
        <Modal show onHide={onHide} centered keyboard>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={sumbitHandler}>
                    <fieldset>
                        <p className="lead">{confirmText}</p>
                        <Modal.Footer>
                            <ConfirmButtons parameters={parameters} onHide={onHide}/>
                        </Modal.Footer>
                    </fieldset>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
