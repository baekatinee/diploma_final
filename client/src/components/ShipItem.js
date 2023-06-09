import React, {useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import EditShip from './modals/EditShip';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const ShipItem = ({ ship, handleDelete, iterator}) => {
  const [shipUpdateVisible, setUpdateShipVisible] = React.useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const deleteOne = async (e) => {

    try {
      await handleDelete(ship.id);
      setConfirmDeleteVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (e) => {
    setUpdateShipVisible(true);
  };
  const openConfirmDeleteModal = (e) => {
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
      <td>{ship.name}</td>
      <td>{ship.number}</td>
      <td>{ship.length}</td>
      <td>{ship.priceSummer}</td>
      <td>{ship.priceWinter}</td>
      <td>{ship.parkingNumber}</td>
      <td style={{ width: '100%' }} className="d-flex justify-content-around">
        <EditButton onClick={openEditModal}/>
        <EditShip
          shipItem={ship}
          show={shipUpdateVisible}
          onHide={() => setUpdateShipVisible(false)}
        />
        <DeleteButton onClick={openConfirmDeleteModal} />
        <Modal show={confirmDeleteVisible} onHide={closeConfirmDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Удаление судна</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Вы уверены, что хотите удалить судно?</p>
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
    </tr>
  );
};

export default ShipItem;
