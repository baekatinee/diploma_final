import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import ClientList from '../components/ClientList';
import Pages from '../components/Pages';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchClients } from '../http/clientAPI';
import StatusClient from '../components/StatusClient';


const Clients = observer(() => {
    const { client } = useContext(Context)
    useEffect(() => {
        fetchClients().then(data => {
            if (client) {
                client.setClients(data.rows);
            }
        });
    }, [client]);
    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Дашборд</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Клиенты
                </Breadcrumb.Item>
            </Breadcrumb>

            <Row className='mb-2'>
                <Col md={10}>
                    <h1>
                        Все клиенты
                    </h1>
                </Col>
            </Row>
            <Row className='mb-2'>
                <Col>
                    <StatusClient />
                </Col>
            </Row>
            <ClientList>
            </ClientList>
            <Pages></Pages>
        </Container>

    )
})
export default Clients;