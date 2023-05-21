import React from 'react'
import { Container } from 'react-bootstrap';
import ClientList from '../components/ClientList';
import Pages from '../components/Pages';

const Clients = () => {
    return (
        <Container>
           <h1>
                Все клиенты
            </h1>
            <ClientList>
            </ClientList>
            <Pages></Pages>
        </Container>

    )
}
export default Clients;