import React from 'react'
import { Container } from 'react-bootstrap';
import PaymentList from '../components/PaymentList';

const Payments = () => {
    return (
        <Container>
            <h1>
                Все оплаты
            </h1>
            <PaymentList></PaymentList>
        </Container>
    )
}
export default Payments;