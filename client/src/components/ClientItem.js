import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTE } from '../utils/consts';
import { Button } from 'react-bootstrap';
import EditClient from './modals/EditClient';

const ClientItem = ({ client, handleDelete, iterator, isAllClients }) => {
  const navigate = useNavigate();
  const [clientUpdateVisible, setUpdateClientVisible] = useState(false);


  const deleteOne = async (e) => {
    e.stopPropagation(); // Остановить распространение события клика
    try {
      await handleDelete(client.id);
    } catch (e) {
      console.log(e);
    }
  };

  const goToClientPage = (e) => {
    if (!e.target.closest('button')) {
      navigate(CLIENT_ROUTE + '/' + client.id);
    }
  };

  const openEditModal = (e) => {
    e.stopPropagation(); // Остановить распространение события клика
    setUpdateClientVisible(true);
  };

  const closeEditModal = (e) => {
    if (e) {
      e.preventDefault(); // Предотвратить действие по умолчанию (переход на страницу клиента)
    }
    setUpdateClientVisible(false);
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
          onHide={closeEditModal}
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
