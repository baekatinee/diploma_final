import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { ListGroup} from 'react-bootstrap';


const StatusBar = observer(() => {
  const {ship} = useContext(Context)

    return (
        <ListGroup horizontal>
            {ship.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === ship.selectedType.id}
                    onClick={() =>ship.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default StatusBar;