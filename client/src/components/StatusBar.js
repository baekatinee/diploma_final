import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Tab, Tabs } from '@mui/material';

const StatusBar = observer(() => {
    const { ship } = useContext(Context);

    const handleTabChange = (event, newValue) => {
        let selectedType;

        if (newValue === '') {
            selectedType = undefined;
        } else {
            selectedType = ship.types.find((type) => type.id === newValue);
        }

        ship.setSelectedType(selectedType);
    };

    return (
        <Tabs
            value={ship.selectedType?.id || ''}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Ship Types"
        >
            <Tab label="Все" value="" style={{ cursor: 'pointer' }} />
            {ship.types.map((type) => (
                <Tab
                    key={type.id}
                    label={type.name}
                    value={type.id}
                    style={{ cursor: 'pointer' }}
                />
            ))}
        </Tabs>
    );
});

export default StatusBar;
