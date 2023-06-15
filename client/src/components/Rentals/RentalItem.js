import React from 'react';

const RentalItem = ({ rental, clientSurname, shipName }) => {
    let date = new Date(rental.dateStart);
    const formattedDateStart = date.toLocaleDateString();
    date = new Date(rental.dateEnd);
    const formattedDateEnd = date.toLocaleDateString();
    return (
        <tr>
            <td>{rental.id}</td>
            <td>{clientSurname}</td>
            <td>{shipName}</td>
            <td>{formattedDateStart}</td>
            <td>{formattedDateEnd}</td>
        </tr>
    );
};

export default RentalItem;
