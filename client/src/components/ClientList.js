import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Table } from 'react-bootstrap';
import ClientItem from './ClientItem';
import { fetchClients, deleteClient } from '../http/clientAPI';
import { CLIENTS_ROUTE} from '../utils/consts';
import { useLocation } from 'react-router-dom';

const ClientList = observer(({ showOnlyDebt }) => {
  const { client } = useContext(Context);
  const location = useLocation();
  const isAllClients = location.pathname === CLIENTS_ROUTE;


  useEffect(() => {
    fetchClients().then(data => {
      if (client) {
        client.setClients(data.rows);
      }
    });
  }, [client]);

  const filteredClients = showOnlyDebt ? client.clients.filter(client => !client.hasPaid) : client.clients;
  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      fetchClients().then(data => {
        if (client) {
          client.setClients(data.rows);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Table hover>
      <thead>
        <tr>
          <th>№</th>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
          <th>Номер телефона</th>
          <th>Email</th>
          {isAllClients && <th>Статус оплаты</th>}
          {isAllClients && <th>Действия</th>}
        </tr>
      </thead>
      <tbody>
        {filteredClients.map((client, index) => (
          <ClientItem
            key={client.id}
            isAllClients={isAllClients}
            iterator={index + 1}
            client={client}
            handleDelete={handleDelete}
          />
        ))}
      </tbody>
    </Table>
  );
});

export default ClientList;