import { Form, Modal } from 'react-bootstrap';
import ConfirmButtons from './ConfirmButtons';

export default function ConfirmModal ({children, ...rest}) {
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
            name: confirmButton ?? 'Отправить',
            variant: btnVariant ?? 'primary',
        },
        cancelButton: {
            name: 'Отменить',
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
                    <p className="lead">{confirmText}</p>
                    <Modal.Footer>
                        <ConfirmButtons parameters={parameters} onHide={onHide}/>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
