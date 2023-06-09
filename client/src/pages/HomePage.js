import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { HOME_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png'
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center w-50 d-flex flex-column align-items-center justify-content-center">
        <img src={logo} style={{ width: "15%" }} />
        <h1 className=" mb-4">Веб-приложение для автоматизации бизнес-процессов яхт-клуба</h1>
        <div className="text-justify mb-4" style={{ fontSize: "1.25rem", width: "75%" }}>Система позволяет автоматически определить задолженников и
          рассчитать долг за неустойку,
          вести учет всех клиентов и выводить статистику</div>
        <div className="mb-4">Для начала работы, пожалуйста, пройдите авторизацию!</div>
      </div>
      <Button className="mb-4" onClick={() => navigate(LOGIN_ROUTE)} variant="primary" size="lg">
        Авторизоваться
      </Button>
      <div>
        <NavLink to={HOME_ROUTE}>
          Нужна помощь? Свяжитесь с нами
        </NavLink>
      </div>
      
    </Container>
  );
};

export default HomePage;