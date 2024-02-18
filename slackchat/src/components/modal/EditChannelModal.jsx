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

    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    });
    useEffect(() => {
        inputRef.current.select();
    }, []);

    const channelsNames = channels
        .map((channel) => channel.name)
        .filter((name) => name !== channel?.name )

    const validationSchema = yup.object().shape({
        channelName: yup.string()
            .trim()
            .min(3, 'От 3 до 20 символов')
            .max(20, 'От 3 до 20 символов')
            .required('Обязательное поле')
            .notOneOf(channelsNames, 'Должно быть уникальным'),
        channelNames: yup.array(),
    });

    const formik = useFormik({
        initialValues: {
            channelName: channel?.name ?? '',
            channels: channelsNames,
        },

        validationSchema,

        onSubmit: (values) => {
            if (channel) {
                confirmAction(channel.id, filter.clean(values.channelName));
            }
            if (!channel) {
                confirmAction(filter.clean(values.channelName));
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
                                    ref={inputRef}
                                    value={formik.values.channelName}
                                    onChange={formik.handleChange}
                                    isInvalid={formik.touched.channelName && formik.errors.channelName}
                                    name="channelName"
                                />
                                <Form.Control.Feedback type="invalid" className="position-absolute">
                                    {formik.errors.channelName}
                                </Form.Control.Feedback>
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
