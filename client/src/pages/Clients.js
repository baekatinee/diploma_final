import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import ClientList from '../components/Clients/ClientList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchClients } from '../http/clientAPI';
import StatusClient from '../components/Tabs/StatusClient';
import PagesClient from '../components/Pagination/PagesClient';
import BreadСrumbs from '../components/BreadCrumbs';
import { CLIENTS_ROUTE, DASHBOARD_ROUTE } from '../utils/consts';

const Clients = observer(() => {
    const { client } = useContext(Context)
    useEffect(() => {
        fetchClients(null, null, 10).then(data => {
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
    }, [client.page, client.selectedStatus,]);
    const breadcrumbsLinks = [
        { text: 'Дашборд', url: DASHBOARD_ROUTE },
        { text: 'Клиенты', url: CLIENTS_ROUTE },
      ];
    return (
        <Container>
            <BreadСrumbs links={breadcrumbsLinks} />
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