import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTE } from '../../utils/consts';
import { Button, Modal, Badge } from 'react-bootstrap';
import EditClient from '../modals/Edit/EditClient';
import EditButton from '../Buttons/EditButton';
import DeleteButton from '../Buttons/DeleteButton';

const ClientItem = ({ client, handleDelete, handleUpdateClient, iterator, isAllClients }) => {
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

  const goToClientPage = () => {
    navigate(CLIENT_ROUTE + '/' + client.id);
  };

  const openEditModal = (e) => {
    setUpdateClientVisible(true);
  };

  const closeEditModal = (e) => {
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
    <tr>
      <td>{iterator}</td>
      <td onClick={goToClientPage} style={{ cursor: 'pointer' }}>
        {client.surname}
      </td>
      <td onClick={goToClientPage} style={{ cursor: 'pointer' }}>{client.name}</td>
      <td onClick={goToClientPage} style={{ cursor: 'pointer' }}>{client.fathersName}</td>
      <td>{client.phoneNumber}</td>
      <td>{client.email}</td>
      {isAllClients && (
        <td>
          {client.hasPaid ? (
            <Badge pill bg="success" style={{ width: '70%' }}>
              Оплачено
            </Badge>
          ) : (
            <Badge pill bg="danger" style={{ width: '70%' }}>
              Долг
            </Badge>
          )}
        </td>
      )}
      {isAllClients && (
        <td style={{ width: '100%' }} className="d-flex justify-content-around">
          <EditButton onClick={openEditModal} />
          <EditClient handleUpdateClient={handleUpdateClient} key={client.id} client={client} show={clientUpdateVisible} onHide={closeEditModal} />
          <DeleteButton onClick={openConfirmDeleteModal} />
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
      )}
    </tr>
  );
};

export default ClientItem;
