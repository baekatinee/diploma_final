import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import PaymentList from '../components/PaymentList';
import { fetchPayments } from '../http/paymentAPI';
import CreatePayment from '../components/modals/CreatePayment';
import { fetchRentals } from '../http/rentalAPI';
import Pages from '../components/Pages';

const Payments = observer(() => {
    const { payment, rental } = useContext(Context);
    const [paymentVisible, setPaymentVisible] = useState(false)
    useEffect(() => {
        fetchPayments().then(data => {
            if (payment) {
                payment.setPayments(data.rows);
            }
        });
        fetchRentals().then(data => {
            if (rental) {
                rental.setRentals(data.rows);
            }
        });
    },);
    return (
        <Container>
             <Breadcrumb>
                <Breadcrumb.Item href="/">Дашборд</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Оплаты
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row className='mb-2'>
                <Col md={10}>
                    <h1>
                        Все оплаты
                    </h1>
                </Col>
                <Col md={2} className='d-flex align-items-center'>
                    <Button variant="outline-primary" onClick={() => setPaymentVisible(true)}>
                        Добавить оплату
                    </Button>
                    <CreatePayment show={paymentVisible} onHide={() => setPaymentVisible(false)} />
                </Col>
            </Row>
            <PaymentList></PaymentList>
            <Pages></Pages>
        </Container>
    )
})
export default Payments;