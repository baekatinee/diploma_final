import './App.css';
import { BrowserRouter } from "react-router-dom"
import AppRouter from './components/AppRouter';
import NavBar from './components/Menus/NavBar';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check } from './http/userAPI';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import SideMenu from './components/Menus/SideMenu';

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])


  if (loading) {
    return <div style={stylesSpinner.container} ><Spinner animation="border" variant="primary" style={stylesSpinner.spinner} /></div>
  }
  return (
    <BrowserRouter>
      <Row>
        <Col md={2} >
          <SideMenu></SideMenu>
        </Col>
        <Col md={user.isAuth ? 10 : 12}>
          <Container>

            <Row className="mb-3">

              <NavBar />
            </Row>

            <Row>
              <AppRouter />
            </Row>
          </Container >
        </Col>
      </Row>

    </BrowserRouter>

  );
});

const stylesSpinner = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
  spinner: {
    width: '50px',
    height: '50px',
  }
};
export default App;
