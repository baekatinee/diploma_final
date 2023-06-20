import React, { useState } from 'react';
import { Accordion, Button, Col, Modal, Row, Table } from 'react-bootstrap';
import EditShip from '../modals/Edit/EditShip';
import CreatePayment from '../modals/CreatePayment';
import EditRental from '../modals/Edit/EditRental';
import EditButton from '../Buttons/EditButton';
import DeleteButton from '../Buttons/DeleteButton';

const ClientRentalItem = ({
  handleDeleteShip,
  handleUpdateShip,
  rental,
  handleDelete,
  clientObj,
  shipObj,
  handleCreatePayment,
  handleUpdateRental
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shipUpdateVisible, setUpdateShipVisible] = useState(false);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [rentalVisible, setRentalVisible] = useState(false);
  const [confirmDeleteVisibleShip, setConfirmDeleteVisibleShip] = useState(false);
  const [confirmDeleteVisibleRental, setConfirmDeleteVisibleRental] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const deleteOne = async () => {
    try {
      await handleDelete(rental.id);
      setConfirmDeleteVisibleRental(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openConfirmDeleteModalRental = (e) => {
    setConfirmDeleteVisibleRental(true);
  };

  const closeConfirmDeleteModalRental = () => {
    setConfirmDeleteVisibleRental(false);
  };

  const confirmDeleteRental = () => {
    deleteOne();
  };

  const deleteShip = async () => {
    try {
      await handleDeleteShip(shipObj.id);
      setConfirmDeleteVisibleShip(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModalShip = () => {
    setUpdateShipVisible(true);
  };

  const openConfirmDeleteModalShip = () => {
    setConfirmDeleteVisibleShip(true);
  };
  const closeConfirmDeleteModalShip = () => {
    setConfirmDeleteVisibleShip(false);
  };
  const confirmDeleteShip = () => {
    deleteShip();
  };
  let date = new Date(rental.dateStart);
  const formattedDateStart = date.toLocaleDateString();
  date = new Date(rental.dateEnd);
  const formattedDateEnd = date.toLocaleDateString();

  return (
    <Accordion.Item className="border-0" eventKey={rental.id}>
      <Accordion.Header onClick={toggleAccordion}>
        <div className="d-flex w-60 justify-content-between" style={{ width: '40%' }}>
          <div>Аренда № {rental.id}  с {formattedDateStart} по {formattedDateEnd}</div>

        </div>
      </Accordion.Header>
      <Accordion.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Судно</th>
              <th>Бортовой номер</th>
              <th>Длина</th>
              <th>Парковочное место</th>
              <th>Стоимость зима</th>
              <th>Стоимость лето</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{shipObj.name}</td>
              <td>{shipObj.number}</td>
              <td>{shipObj.length}</td>
              <td>{shipObj.parkingNumber}</td>
              <td>{shipObj.priceWinter}</td>
              <td>{shipObj.priceSummer}</td>
              <td className="d-flex justify-content-around">
                <EditButton onClick={openEditModalShip} />
                <EditShip
                  handleUpdateShip={handleUpdateShip}
                  shipItem={shipObj}
                  show={shipUpdateVisible}
                  onHide={() => setUpdateShipVisible(false)}
                />
                <DeleteButton onClick={openConfirmDeleteModalShip} />
              </td>
            </tr>
          </tbody>
        </Table>
        <Row>
          <Col md={9}>
            <Button className="mt-2" variant="primary" onClick={() => setPaymentVisible(true)}>
              Добавить оплату
            </Button>{' '}
            <CreatePayment
              handleCreate={handleCreatePayment}
              show={paymentVisible}
              clientId={clientObj.id}
              rentalId={rental.id}
              onHide={() => setPaymentVisible(false)}
            />
          </Col>
          <Col md={3} className="d-flex justify-content-end">
            <Button
              style={{ marginRight: '1rem' }}
              className="mt-2"
              variant="outline-dark"
              onClick={() => setRentalVisible(true)}
            >
              Изменить
            </Button>{' '}
            <EditRental
              handleUpdateRental={handleUpdateRental}
              show={rentalVisible}
              rental={rental}
              clientId={clientObj.id}
              shipId={shipObj.id}
              onHide={() => setRentalVisible(false)}
            />
            <Button onClick={openConfirmDeleteModalRental} className="mt-2" variant="outline-danger">
              Удалить
            </Button>{' '}
          </Col>
          <Modal show={confirmDeleteVisibleRental} onHide={closeConfirmDeleteModalRental}>
            <Modal.Header closeButton>
              <Modal.Title>Удаление аренды</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Вы уверены, что хотите удалить аренду?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeConfirmDeleteModalRental}>
                Отмена
              </Button>
              <Button variant="danger" onClick={confirmDeleteRental}>
                Удалить
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={confirmDeleteVisibleShip} onHide={closeConfirmDeleteModalShip}>
            <Modal.Header closeButton>
              <Modal.Title>Удаление судна</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Вы уверены, что хотите удалить судно?</p>
              <p>Все связанные аренды и оплаты будут удалены.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeConfirmDeleteModalShip}>
                Отмена
              </Button>
              <Button variant="danger" onClick={confirmDeleteShip}>
                Удалить
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default ClientRentalItem;
