import React from 'react'

const PaymentItem = ({ payment, clientSurname,  rentalObj}) => {
   
    return (
        <tr>
          <td>{payment.id}</td>
          <td>{payment.dateStart}</td>
          <td>{payment.sum}</td>
          <td>{clientSurname}</td>
          <td>{rentalObj.dateStart}</td>
        </tr>
    )
}

export default PaymentItem
