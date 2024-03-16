import filter from 'leo-profanity';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MessageSendField = ({ submitMessage }) => {
  const { t } = useTranslation();

  const [message, setMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitting(true);
    submitMessage(filter.clean(message));
    setMessage('');
    setSubmitting(false);
  };

  return (
    <div className="mt-auto px-5 py-3">
      <form className="py-1 border rounded-2" noValidate="" onSubmit={submitHandler}>
        <div className="input-group has-validation">
          <input
            aria-label={t('messages.ariaLabel')}
            className="border-0 p-0 ps-2 form-control"
            name="body"
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('messages.enterMessage')}
            value={message}
          />
          <button className="btn btn-group-vertical border-0" disabled={!message || isSubmitting} type="submit">
            <svg data-darkreader-inline-fill="" fill="currentColor" height="20" style={{ '--darkreader-inline-fill': 'currentColor;' }} viewBox="0 0 16 16" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" fillRule="evenodd" />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageSendField;
