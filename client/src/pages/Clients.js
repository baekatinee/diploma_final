import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import ClientList from '../components/ClientList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchClients } from '../http/clientAPI';
import StatusClient from '../components/StatusClient';
import PagesClient from '../components/PagesClient';


const Clients = observer(() => {
    const { client } = useContext(Context)
    useEffect(() => {
        fetchClients(null, 1, 10).then(data => {
            if (client) {
                client.setClients(data.rows);
                client.setTotalCount(data.count);
            }
        });
    }, [client]);
    useEffect(() => {
        if (client.selectedStatus && client.selectedStatus.id) {
            fetchClients(client.selectedStatus.definition, client.page, 10)
                .then((data) => {
                    if (client) {
                        client.setClients(data.rows);
                        client.setTotalCount(data.count);
                    }
                })
        } else {
         
            fetchClients(null, client.page, 10)
                .then((data) => {
                    if (client) {
                        client.setClients(data.rows);
                        client.setTotalCount(data.count);
                    }
                })
                .catch((error) => {
                    
                });
        }
    }, [client.page, client.selectedStatus]);
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
            <PagesClient />
        </Container>

    )
})
export default Clients;