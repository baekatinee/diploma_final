import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import PaymentList from '../components/Payments/PaymentList';
import { fetchPayments } from '../http/paymentAPI';
import CreatePayment from '../components/modals/CreatePayment';
import { fetchRentals } from '../http/rentalAPI';
import Pages from '../components/Pagination/Pages';
import BreadСrumbs from '../components/BreadCrumbs';
import { DASHBOARD_ROUTE, PAYMENTS_ROUTE } from '../utils/consts';
import { fetchClients } from '../http/clientAPI';
const Payments = observer(() => {
    const { payment, rental, client } = useContext(Context);
    const [paymentVisible, setPaymentVisible] = useState(false)
    useEffect(() => {
        fetchPayments(payment.page,10).then(data => {
            if (payment) {
                payment.setPayments(data.rows);
            }
        });
        fetchRentals(null, null, null).then(data => {
            if (rental) {
                rental.setRentals(data.rows);
            }
        });
        fetchClients(null, null, null).then(data => {
            if (client) {
              client.setClients(data.rows);
            }
          });
    },);
    const breadcrumbsLinks = [
        { text: 'Дашборд', url: DASHBOARD_ROUTE },
        { text: 'Оплаты', url: PAYMENTS_ROUTE },
      ];
    return (
        <Container>
             <Breadcrumb>
         <BreadСrumbs links={breadcrumbsLinks} />
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