import React, { useContext, useEffect } from 'react'
import { observer } from "mobx-react-lite"
import { Context } from "../index"
import { Table } from 'react-bootstrap';
import ClientItem from './ClientItem';
import { fetchClients } from '../http/clientAPI';
import { deleteClient } from '../http/clientAPI';
import { CLIENTS_ROUTE } from '../utils/consts';
import { useLocation } from 'react-router-dom';

const ClientList = observer(() => {
  useEffect(() => {
    fetchClients().then(data => {
        if (client) {
            client.setClients(data.rows);
        }
    });
}, []);
  const { client } = useContext(Context)
  const location = useLocation();
  const isAllClients = location.pathname === CLIENTS_ROUTE
  const clientsArray = Object.values(client.clients).filter(client => typeof client === 'object')
  console.log('clientsArray:', clientsArray);
  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      fetchClients();
    } catch (e) {
      console.log(e);
    }
  }
  let iterator = 1;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>№</th>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
          <th>Номер телефона</th>
          <th>Email</th>
          {isAllClients ?
            <th>Действия</th> : ""}
        </tr>
      </thead>
      <tbody>
        {console.log(client.clients)}
        {client.clients && Array.isArray(client.clients) && client.clients.map(client =>
          <ClientItem key={client.id} isAllClients={isAllClients} iterator={iterator++} client={client} handleDelete={handleDelete}>
          </ClientItem>
        )}
      </tbody>
    </Table>
  )
})

export default ClientList