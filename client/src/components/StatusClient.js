import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Button, ListGroup} from 'react-bootstrap';


const StatusClient = observer(() => {
  const {client} = useContext(Context)

    return (
        <ListGroup horizontal>
            {client.status.map(status =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={status.id === client.selectedStatus.id}
                    onClick={() =>client.setSelectedStatus(status)}
                    key={status.id}
                >
                    {status.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default StatusClient;