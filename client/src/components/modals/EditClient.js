// import React, { useState } from 'react';
// import { Modal, Form, Button, FormControl } from 'react-bootstrap';
// import { updateClient } from '../../http/clientAPI';
// import validator from 'validator';

// const EditClient = ({ show, onHide, client }) => {
//     const [surname, setSurname] = useState(client.surname);
//     const [name, setName] = useState(client.name);
//     const [fathersName, setFathersName] = useState(client.fathersName);
//     const [email, setEmail] = useState(client.email);
//     const [phoneNumber, setPhoneNumber] = useState(client.phoneNumber);
//     const [comment, setComment] = useState(client.comment);

//     const updateClientData = () => {
//         const isValidEmail = validator.isEmail(email);
//         if (!isValidEmail) {
//             alert('Некорректный email');
//             return;
//         }
//         try {
//             const updatedClient = {
//                 ...client,
//                 surname,
//                 name,
//                 fathersName,
//                 email,
//                 phoneNumber,
//                 comment,
//             };
//             updateClient(updatedClient).then((data) => {
//                 onHide();
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <Modal show={show} onHide={onHide} size="lg" centered>
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     Изменить данные клиента
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={updateClientData}>
//                     <div className="d-flex">
//                         <FormControl
//                             required
//                             className="mb-2"
//                             type="text"
//                             name="surname"
//                             placeholder="Введите фамилию"
//                             value={surname}
//                             onChange={(e) => setSurname(e.target.value)}
//                         />
//                         <FormControl
//                             className="mb-2"
//                             required
//                             type="text"
//                             name="name"
//                             placeholder="Введите имя"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>
//                     <div className="d-flex">
//                         <FormControl
//                             className="mb-2"
//                             required
//                             type="text"
//                             name="fathersName"
//                             placeholder="Введите отчество"
//                             value={fathersName}
//                             onChange={(e) => setFathersName(e.target.value)}
//                         />
//                         <FormControl
//                             className="mb-2"
//                             required
//                             type="email"
//                             name="email"
//                             placeholder="Введите email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="d-flex">
//                         <FormControl
//                             className="mb-2"
//                             required
//                             type="phone"
//                             name="phoneNumber"
//                             placeholder="Введите номер телефона"
//                             value={phoneNumber}
//                             onChange={(e) => setPhoneNumber(e.target.value)}
//                         />
//                         <FormControl
//                             className="mb-2"
//                             type="text"
//                             name="comment"
//                             placeholder="Комментарии"
//                             value={comment}
//                             onChange={(e) => setComment(e.target.value)}
//                         />
//                     </div>
//                     <Button type="submit" variant="outline-success">
//                         Сохранить изменения
//                     </Button>
//                     <Button onClick={onHide} variant="outline-danger">
//                         Закрыть
//                     </Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default EditClient;



