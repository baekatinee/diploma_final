import './App.css';
import { BrowserRouter } from "react-router-dom"
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check } from './http/userAPI';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import SideMenu from './components/SideMenu';

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
        <Col md={2} className="me-4"> {/* Add `me-4` class for right margin */}
          <SideMenu></SideMenu>
        </Col>
        <Col md={9}>
          <Row className="mb-3"> {/* Add `mb-3` class for bottom margin */}
            <NavBar />
          </Row>
          <Row>
            <AppRouter />
          </Row>
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
