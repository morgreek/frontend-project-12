import { Button } from 'react-bootstrap';

const ConfirmButtons = ({ onHide, parameters }) => {
  const { confirmButton } = parameters;
  const { cancelButton } = parameters;
  return (
    <div className="d-flex justify-content-end">
      <Button className="me-2" onClick={onHide} variant={cancelButton.variant}>{cancelButton.name}</Button>
      <Button type="submit" variant={confirmButton.variant}>{confirmButton.name}</Button>
    </div>
  );
};

export default ConfirmButtons;
