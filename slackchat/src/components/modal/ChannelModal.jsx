import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { useEffect, useRef } from 'react';
import { Form, Modal, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import ConfirmButtons from './ConfirmButtons';

const ChannelModal = ({ children, ...rest }) => {
  const { t } = useTranslation();
  const {
    btnVariant,
    channel,
    channels,
    confirmAction,
    confirmButton,
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

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  const channelsNames = channels
    .map((item) => item.name)
    .filter((name) => name !== channel?.name);

  const validationSchema = yup.object().shape({
    channelNames: yup.array(),
    name: yup.string()
      .trim()
      .min(3, t('validation.from3To20Chars'))
      .max(20, t('validation.from3To20Chars'))
      .required(t('validation.isRequiredField'))
      .notOneOf(channelsNames, t('validation.mustUnique')),
  });

  const formik = useFormik({
    initialValues: {
      channels: channelsNames,
      name: channel?.name ?? '',
    },

    onSubmit: (values) => {
      if (channel) {
        confirmAction(channel.id, filter.clean(values.name));
      }
      if (!channel) {
        confirmAction(filter.clean(values.name));
      }
      onHide();
    },

    validationSchema,
  });

  return (
    <Modal centered keyboard onHide={onHide} show>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Stack gap={2}>
              <Form.Group className="position-relative">
                <Form.Control
                  id="name"
                  isInvalid={formik.touched.name && formik.errors.name}
                  name="name"
                  onChange={formik.handleChange}
                  ref={inputRef}
                  type="text"
                  value={formik.values.name}
                />
                <Form.Label htmlFor="name" visuallyHidden>{ t('channels.channelName') }</Form.Label>
                <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
              </Form.Group>
            </Stack>
            <Modal.Footer>
              <ConfirmButtons onHide={onHide} parameters={parameters} />
            </Modal.Footer>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelModal;
