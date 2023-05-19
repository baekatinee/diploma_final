import React from 'react'

const PaymentItem = ({ payment, clientSurname, shipName}) => {
   
    return (
        <tr>
          <td>{payment.id}</td>
          <td>{payment.dateStart}</td>
          <td>{payment.sum}</td>
          <td>{clientSurname}</td>
          <td>{shipName}</td>
        </tr>
    )
}

export default PaymentItem
