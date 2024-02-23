import { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Form, Modal, Stack } from 'react-bootstrap';
import ConfirmButtons from './ConfirmButtons';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

export default function EditChannelModal ({children, ...rest}) {
    const { t } = useTranslation();
    const {
        title,
        confirmButton,
        btnVariant,
        onHide,
        channel,
        channels,
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

    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef.current) {
          inputRef.current.select();
        }
      }, []);

    const channelsNames = channels
        .map((channel) => channel.name)
        .filter((name) => name !== channel?.name )

    const validationSchema = yup.object().shape({
        name: yup.string()
            .trim()
            .min(3, 'От 3 до 20 символов')
            .max(20, 'От 3 до 20 символов')
            .required('Обязательное поле')
            .notOneOf(channelsNames, 'Должно быть уникальным'),
        channelNames: yup.array(),
    });

    const formik = useFormik({
        initialValues: {
            name: channel?.name ?? '',
            channels: channelsNames,
        },

        validationSchema,

        onSubmit: (values) => {
            if (channel) {
                confirmAction(channel.id, filter.clean(values.name));
            }
            if (!channel) {
                confirmAction(filter.clean(values.name));
            }
            onHide();
        }
    });

    return (
        <Modal show onHide={onHide} centered keyboard>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <fieldset disabled={formik.isSubmitting}>
                        <Stack gap={2}>
                            <Form.Group className="position-relative">
                                <Form.Control
                                    type="text"
                                    ref={inputRef}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    isInvalid={formik.touched.name && formik.errors.name}
                                    name="name"
                                    id="name"
                                />
                                <Form.Label visuallyHidden htmlFor="name">{ t('channels.channelName') }</Form.Label>
                                <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                            </Form.Group>
                        </Stack>
                        <Modal.Footer>
                            <ConfirmButtons parameters={parameters} onHide={onHide}/>
                        </Modal.Footer>
                    </fieldset>
                </Form>
            </Modal.Body>
        </Modal>
    );
}