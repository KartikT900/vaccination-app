import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppointmentsContext = React.createContext();
const AppointmentsUpdateContext = React.createContext();

export function useAppointmentContext() {
  return {
    appointments: useContext(AppointmentsContext),
    updateAppointments: useContext(AppointmentsUpdateContext)
  };
}

function AppointmentsProvider({ children }) {
  const [appointments, setAppointments] = useState(null);

  const updateAppointments = (data) => {
    setAppointments(data);
  };

  return (
    <AppointmentsContext.Provider value={appointments}>
      <AppointmentsUpdateContext.Provider value={updateAppointments}>
        {children}
      </AppointmentsUpdateContext.Provider>
    </AppointmentsContext.Provider>
  );
}

AppointmentsProvider.propTypes = {
  children: PropTypes.node
};

export default AppointmentsProvider;
