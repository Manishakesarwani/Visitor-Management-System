import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthorizationContextProvider } from './Context/AuthorizationContext';
import { VisitorContextProvider } from './Context/VisitorContext';
import { AppointmentContextProvider } from './Context/AppointmentContext';
import { PassContextProvider } from './Context/PassContext';
import { CheckInOutContextProvider } from './Context/CheckInOutContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthorizationContextProvider>
    <VisitorContextProvider>
      <AppointmentContextProvider>
        <PassContextProvider>
          <CheckInOutContextProvider>
            <App />
          </CheckInOutContextProvider>
        </PassContextProvider>
      </AppointmentContextProvider>
    </VisitorContextProvider>
    </AuthorizationContextProvider>
  </React.StrictMode>
);
