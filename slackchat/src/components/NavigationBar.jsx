import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useAuthorizationContext } from '../hooks/useAuthorizationContext';

const NavigationBar = () => {
  const auth = useAuthorizationContext();
  const handleLogOut = () => {
    auth.setLogin(null);
    localStorage.clear();
  };
  const { t } = useTranslation();

  return (
    <Navbar bg="white" className="shadow-sm" expand="lg">
      <Container>
        <Navbar.Brand>Hexlet Chat</Navbar.Brand>
        {
          auth.userData
            ? <Button onClick={handleLogOut}>{t('logOut')}</Button>
            : null
        }

      </Container>
    </Navbar>
  );
};

export default NavigationBar;
