import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserCrm from './crm/UserCrm';
import ShipCrm from './crm/ShipCrm';
import ClientCrm from './crm/ClientCrm';
import RentalCrm from './crm/RentalCrm';
import PaymentCrm from './crm/PaymentCrm';
import TypeCrm from './crm/TypeCrm';

export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Context.Provider value={{
        user:new UserCrm(),
        ship:new ShipCrm(),
        client:new ClientCrm(),
        rental:new RentalCrm(),
        payment:new PaymentCrm(),
        type: new TypeCrm()
    }}>
    <App />
    </Context.Provider>
)



reportWebVitals();
