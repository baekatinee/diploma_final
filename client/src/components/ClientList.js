import React, { useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Table } from 'react-bootstrap';
import ClientItem from './ClientItem';
import { fetchClients } from '../http/clientAPI';
import { deleteClient } from '../http/clientAPI';
import { CLIENTS_ROUTE } from '../utils/consts';
import { useLocation } from 'react-router-dom';

const ClientList = observer(({ updateFlag }) => {
  const { client } = useContext(Context);
  const location = useLocation();
  const isAllClients = location.pathname === CLIENTS_ROUTE;

  useEffect(() => {
    fetchClients().then(data => {
      if (client) {
          client.setClients(data.rows);
      }
  });
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      // После удаления клиента, обновите данные, чтобы компонент перерендерился
      fetchClients().then(data => {
        if (client) {
          client.setClients(data.rows);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

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
          {isAllClients ? <th>Действия</th> : ""}
        </tr>
      </thead>
      <tbody>
        {client.clients.map((client) => (
          <ClientItem key={client.id} isAllClients={isAllClients} iterator={iterator++} client={client} handleDelete={handleDelete} />
        ))}
      </tbody>
    </Table>
  );
});

export default ClientList;
