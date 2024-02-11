import { Button } from 'react-bootstrap';

export default function ConfirmButtons({parameters, onHide}) {
    const confirmButton = parameters.confirmButton;
    const cancelButton = parameters.cancelButton;
    return (
        <div className="d-flex justify-content-end">
            <Button onClick={onHide} variant={cancelButton.variant} className="me-2">{cancelButton.name}</Button>
            <Button type="submit" variant={confirmButton.variant}>{confirmButton.name}</Button>
        </div>
    );
}