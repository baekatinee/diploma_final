import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTE } from '../utils/consts';
import { Button, Modal, Badge } from 'react-bootstrap';
import EditClient from './modals/EditClient';

const ClientItem = ({ client, handleDelete, iterator, isAllClients }) => {
  const navigate = useNavigate();
  const [clientUpdateVisible, setUpdateClientVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const deleteOne = async () => {
    try {
      await handleDelete(client.id);
      setConfirmDeleteVisible(false);
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
    e.stopPropagation();
    setUpdateClientVisible(true);
  };

  const closeEditModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    setUpdateClientVisible(false);
  };

  const openConfirmDeleteModal = (e) => {
    e.stopPropagation();
    setConfirmDeleteVisible(true);
  };

  const closeConfirmDeleteModal = () => {
    setConfirmDeleteVisible(false);
  };

  const confirmDelete = () => {
    deleteOne();
  };
  return (
    <tr onClick={goToClientPage}>
      <td>{iterator}</td>
      <td>{client.surname}</td>
      <td>{client.name}</td>
      <td>{client.fathersName}</td>
      <td>{client.phoneNumber}</td>
      <td>{client.email}</td>
      <td>
        {client.hasPaid ? (
          <Badge pill bg="success">
            Оплачено
          </Badge>
        ) : (
          <Badge pill bg="danger">
            Долг
          </Badge>
        )}
      </td>
      {isAllClients ? (
        <td style={{ width: '100%' }} className="d-flex justify-content-around">
          <Button variant="outline-dark" onClick={openEditModal}>
            Изменить
          </Button>{' '}
          <Button variant="outline-danger" onClick={openConfirmDeleteModal}>
            Удалить
          </Button>
          <EditClient
            key={client.id}
            client={client}
            show={clientUpdateVisible}
            onHide={closeEditModal}
          />
          <Modal show={confirmDeleteVisible} onHide={closeConfirmDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Подтвердить удаление</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Вы уверены, что хотите удалить клиента?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeConfirmDeleteModal}>
                Отмена
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Удалить
              </Button>
            </Modal.Footer>
          </Modal>
        </td>
      ) : (
        ''
      )}
    </tr>
  );
};

export default ClientItem;