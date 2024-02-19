import { Container, Navbar, Button } from 'react-bootstrap';
import { useAuthorizationContext } from '../hooks/useAuthorizationContext';
import { useTranslation } from 'react-i18next';

const NavigationBar = () => {
  const auth = useAuthorizationContext();
  const handleLogOut = () => {
    auth.setLogin(null)
    localStorage.clear();
  }
  const { t } = useTranslation();

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand>{'Hexlet Chat'}</Navbar.Brand>
          {
            auth.userData
              ? <Button onClick={handleLogOut}>{t('logOut')}</Button>
              : null
          }
          
        </Container>
      </Navbar>
    </>
  );
};
  
  export default NavigationBar;