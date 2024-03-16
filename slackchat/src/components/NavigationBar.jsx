import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useAuthorizationContext from '../hooks/useAuthorizationContext';
import routes from '../routes';

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
        <Navbar.Brand as={Link} to={routes.chat}>Hexlet Chat</Navbar.Brand>
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
