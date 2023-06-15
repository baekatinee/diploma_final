import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DASHBOARD_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { registration, login } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import * as Yup from 'yup';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Некорректный email').required('Введите email'),
    password: Yup.string().required('Введите пароль'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ email, password }, { abortEarly: false });

      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data); // Установить данные пользователя
      user.setIsAuth(true); // Установить флаг авторизации
      navigate(DASHBOARD_ROUTE);
      console.log(user.isAuth);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 600 }} className="p-5 mt-5 border-0">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <Form.Control
            className="mt-4"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          <Form.Control
            className="mt-4"
            placeholder="Введите пароль"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          <div className="d-flex justify-content-between align-items-center mt-2">
            {isLogin ? (
              <div>
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Создать</NavLink>
              </div>
            ) : (
              <div>
                Уже зарегистрированы? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
              </div>
            )}
            <Button variant="primary" type="submit">
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
