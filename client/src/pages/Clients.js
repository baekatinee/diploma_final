import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import ClientList from '../components/ClientList';
import Pages from '../components/Pages';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import CreateClient from '../components/modals/CreateClient';
import { fetchClients } from '../http/clientAPI';


const Clients = observer(() => {
    const { client } = useContext(Context)
    const [clientVisible, setClientVisible] = useState(false)
    useEffect(() => {
        fetchClients().then(data => {
            if (client) {
                client.setClients(data.rows);
            }
        });
    },);
    return (
        <Container>
            <Row  className='mb-2'>
                <Col md={10}>
                    <h1>
                        Все клиенты
                    </h1>
                </Col>
                <Col md={2} className='d-flex align-items-center'>
                    <Button variant="outline-primary" onClick={() => setClientVisible(true)}>
                        Добавить клиента
                    </Button>
                    <CreateClient show={clientVisible} onHide={() => setClientVisible(false)} />
                </Col>
            </Row>
            <ClientList>
            </ClientList>
            <Pages></Pages>
        </Container>

    )
})
export default Clients;