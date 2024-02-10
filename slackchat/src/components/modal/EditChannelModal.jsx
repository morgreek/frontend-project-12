import * as yup from 'yup';
import { useFormik } from 'formik';
import { Form, Modal, Stack } from 'react-bootstrap';
import ConfirmButtons from './ConfirmButtons';

export default function EditChannelModal ({children, ...rest}) {
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
            name: confirmButton ?? 'Отправить',
            variant: btnVariant ?? 'primary',
        },
        cancelButton: {
            name: 'Отменить',
            variant: 'secondary',
        }
    };
    
    const channelsNames = channels
        .map((channel) => channel.name)
        .filter((name) => name !== channel?.name )

    const validationSchema = yup.object().shape({
        channelName: yup.string().trim()
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

        onSubmit: () => {
            console.log('test sumbitted')
        }
    });

    const isInvalid = formik.errors.channelName && formik.touched.channelName;

    return (
        <Modal show onHide={onHide} centered keyboard>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Stack gap={2}>
                        <Form.Group className="position-relative">
                            <Form.Control
                                value={formik.values.channelName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={isInvalid}
                                name="channelName"
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.channelName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Stack>
                    <Modal.Footer>
                        <ConfirmButtons parameters={parameters} onHide={onHide}/>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
