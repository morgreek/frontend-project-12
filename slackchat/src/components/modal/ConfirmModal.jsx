import { Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ConfirmButtons from './ConfirmButtons';

export default function ConfirmModal({ children, ...rest }) {
  const { t } = useTranslation();
  const {
    btnVariant,
    confirmAction,
    confirmButton,
    confirmText,
    onHide,
    title,
  } = rest;

  const parameters = {
    cancelButton: {
      name: t('cancel'),
      variant: 'secondary',
    },
    confirmButton: {
      name: confirmButton ?? t('send'),
      variant: btnVariant ?? 'primary',
    },
  };

  const sumbitHandler = (e) => {
    e.preventDefault();
    confirmAction();
    onHide();
  };

  return (
    <Modal centered keyboard onHide={onHide} show>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={sumbitHandler}>
          <fieldset>
            <p className="lead">{confirmText}</p>
            <Modal.Footer>
              <ConfirmButtons onHide={onHide} parameters={parameters} />
            </Modal.Footer>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
