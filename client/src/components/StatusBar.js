import React, { useContext } from 'react'
import { observer } from "mobx-react-lite"
import { Context } from "../index"
import { ListGroup, ListGroupItem } from 'react-bootstrap';


const StatusBar = observer(() => {
    const { client } = useContext(Context)
    return (
        <ListGroup>
            {client.status.map(status =>
                <ListGroupItem 
                style={{cursor:"pointer"}}
                active={status.id===client.selectedStatus.id}
                onClick={()=>client.setSelectedStatus(status)}
                key={status.id}>
                    {status.name}
                </ListGroupItem>
            )}
          
        </ListGroup>
    )
});

export default StatusBar
