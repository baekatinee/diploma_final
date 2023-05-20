import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTE } from '../utils/consts';
import { Button } from 'react-bootstrap';
import { deleteClient, updateClient } from '../http/clientAPI';
import EditClient from './modals/EditClient';

const ClientItem = ({ client, handleDelete, iterator, isAllClients }) => {
  const navigate = useNavigate();
  const [clientUpdateVisible, setUpdateClientVisible] = useState(false);

  useEffect(() => {
    try {
      // updateClient(client.id);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const deleteOne = async (e) => {
    e.stopPropagation(); // Остановить распространение события клика
    try {
      await handleDelete(client.id);
    } catch (e) {
      console.log(e);
    }
  };

  const goToClientPage = () => {
    navigate(CLIENT_ROUTE + '/' + client.id);
  };

  const openEditModal = (e) => {
    e.stopPropagation(); // Остановить распространение события клика
    setUpdateClientVisible(true);
  };

  return (
    <tr onClick={goToClientPage}>
      <td>{iterator}</td>
      <td>{client.surname}</td>
      <td>{client.name}</td>
      <td>{client.fathersName}</td>
      <td>{client.phoneNumber}</td>
      <td>{client.email}</td>
      {isAllClients ? (
        <td style={{ width: '100%' }} className="d-flex justify-content-around">
          <Button variant="outline-dark" onClick={openEditModal}>
            Изменить
          </Button>{' '}
          <EditClient
            key={client.id}
            client={client}
            show={clientUpdateVisible}
            onHide={() => setUpdateClientVisible(false)}
          />
          <Button variant="outline-danger" onClick={deleteOne}>
            Удалить
          </Button>
        </td>
      ) : (
        ''
      )}
    </tr>
  );
};

export default ClientItem;