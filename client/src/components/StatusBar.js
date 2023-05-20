import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { fetchTypes } from '../http/typeAPI';

const StatusBar = observer(() => {
  const { type } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => {
      if (type) {
        type.setTypes(data.rows);
      }
    });
  }, []);

  return (
    <ListGroup>
      {type.types.map((typeItem) => (
        <ListGroupItem
          style={{ cursor: 'pointer' }}
          active={typeItem.id === type.selectedType?.id}
          onClick={() => type.setSelectedType(typeItem)}
          key={typeItem.id}
        >
          {typeItem.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
});

export default StatusBar;