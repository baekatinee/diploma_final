import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Tab, Tabs } from '@mui/material';

const StatusClient = observer(() => {
    const { client } = useContext(Context);

    const handleTabChange = (event, newValue) => {
        const selectedStatus = client.status.find((status) => status.id === newValue);
        client.setSelectedStatus(selectedStatus);
    };

    return (
        <Tabs
            value={client.selectedStatus.id}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Client Status"
        >
            {client.status.map((status) => (
                <Tab
                    key={status.id}
                    label={status.name}
                    value={status.id}
                    style={{ cursor: 'pointer' }}
                />
            ))}
        </Tabs>
    );
});

export default StatusClient;
