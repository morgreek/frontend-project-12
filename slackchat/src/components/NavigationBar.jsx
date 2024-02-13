import { Container, Navbar, Button } from 'react-bootstrap';
import { useAuthorizationContext } from '../hooks/useAuthorizationContext';

const NavigationBar = () => {
  const auth = useAuthorizationContext();
  const handleLogOut = () => {
    auth.setLogin(null)
    localStorage.clear();
  }
  
  // as={Link} to={appPaths.chat}
  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand>{'Hexlet'}</Navbar.Brand>
          {
            auth.userData
              ? <Button onClick={handleLogOut}>Выйти</Button>
              : null
          }
          
        </Container>
      </Navbar>
    </>
  );
};
  
  export default NavigationBar;