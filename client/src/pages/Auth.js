import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { DASHBOARD_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { registration, login } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import NavBar from '../components/NavBar';

const Auth = observer(() => {
    
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const click = async () => {
        try {
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
        } catch (e) {
          alert(e.response.data.message);
        }
      };

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className='p-5 mt-5'>
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-4'
                        placeholder='Введите email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className='mt-4'
                        placeholder='Введите пароль'
                        value={password}
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className='d-flex justify-content-between align-items-center mt-2'>
                        {isLogin ?
                            <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Создать</NavLink>
                            </div>
                            :
                            <div>Уже зарегистрированы? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                            </div>
                        }
                        <Button
                            variant='outline-success'
                            onClick={click}

                        >
                            {isLogin ? "Войти" : "Регистрация"}
                        </Button>
                    </div>
              
                </Form>
            </Card>
        </Container>
    )
})
export default Auth;