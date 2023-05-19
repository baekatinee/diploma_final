import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import CreateClient from '../components/modals/CreateClient';
import CreateShip from '../components/modals/CreateShip';
import CreateType from '../components/modals/CreateType';
import CreateRental from '../components/modals/CreateRental';
import CreatePayment from '../components/modals/CreatePayment';
const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [clientVisible, setClientVisible] = useState(false)
    const [shipVisible, setShipVisible] = useState(false)
    const [paymentVisible, setPaymentVisible] = useState(false)
    const [rentalVisible, setRentalVisible] = useState(false)
    return (
        <Container className='d-flex flex-column'>
            <Button
                className='mt-2'
                variant="outline-dark"
                onClick={()=>setClientVisible(true)}>
                Добавить клиента</Button>{' '}
            <Button
                className='mt-2'
                variant="outline-dark"
                onClick={()=>setShipVisible(true)}>
                Добавить судно</Button>{' '}
            <Button
                className='mt-2'
                variant="outline-dark"
                onClick={()=>setPaymentVisible(true)}>
                Добавить оплату</Button>{' '}
            <Button
                className='mt-2'
                variant="outline-dark"
                onClick={()=>setTypeVisible(true)}>
                Добавить тип судна</Button>{' '}
            <Button
                className='mt-2'
                variant="outline-dark"
                onClick={()=>setRentalVisible(true)}>
                Добавить аренду</Button>{' '}
            <CreateClient show={clientVisible} onHide={() => setClientVisible(false)}></CreateClient>
            <CreateShip show={shipVisible} onHide={() => setShipVisible(false)}></CreateShip>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}></CreateType>
            <CreateRental show={rentalVisible} onHide={() => setRentalVisible(false)}></CreateRental>
            <CreatePayment show={paymentVisible} onHide={() => setPaymentVisible(false)}></CreatePayment>
        </Container>
    )
}
export default Admin;