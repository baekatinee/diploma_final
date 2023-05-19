import React from 'react'
import { Container } from 'react-bootstrap';
import ClientList from '../components/ClientList';

const Clients = () => {
    return (
        <Container>
           <h1>
                Все клиенты
            </h1>
            <ClientList>
            </ClientList>
        </Container>

    )
}
export default Clients;