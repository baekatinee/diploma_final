import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { LOGIN_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-5 mb-2">Добро пожаловать в Центр Парусного спорта!</h1>
        <h3 className="mb-4">Для начала работы, пожалуйста, пройдите авторизацию!</h3>
        <Button onClick={() => navigate(LOGIN_ROUTE)} variant="primary" size="lg">
          Авторизоваться
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;