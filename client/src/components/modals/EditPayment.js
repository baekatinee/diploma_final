import React, { useState } from 'react';
import { Modal, Form, Button, FormControl } from 'react-bootstrap';
import { updatePayment } from '../../http/paymentAPI';

const EditPayment = ({ show, onHide, payment }) => {
  const [dateStart, setDateStart] = useState(payment.dateStart);
  const [sum, setSum] = useState(payment.sum);


  const updateData = () => {
    try {
      const formData = new FormData();
      formData.append('dateStart', dateStart);
      formData.append('sum', sum);

      updatePayment(payment.id, formData).then((data) => {
        onHide();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Редактировать платеж</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateData}>
          <FormControl
            className="mb-2"
            required
            type="date"
            name="dateStart"
            placeholder="Дата оплаты"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
          <FormControl
            className="mb-2"
            required
            type="number"
            name="sum"
            placeholder="Сумма"
            value={sum}
            onChange={(e) => setSum(e.target.value)}
          />
          <Button type="submit" variant="outline-success">
            Сохранить изменения
          </Button>
          <Button onClick={onHide} variant="outline-danger">
            Закрыть
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPayment;
