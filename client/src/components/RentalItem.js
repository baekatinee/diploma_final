import React from 'react';

const RentalItem = ({ rental, clientSurname, shipName }) => {

return (
<tr>
<td>{rental.id}</td>
<td>{clientSurname}</td>
<td>{shipName}</td>
<td>{rental.dateStart}</td>
<td>{rental.dateEnd}</td>
</tr>
);
};

export default RentalItem;