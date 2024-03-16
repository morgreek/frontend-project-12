import { useTranslation } from 'react-i18next';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t('errors.page404')}</p>
    </div>
  );
};

export default PageNotFound;
