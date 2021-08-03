import React, { useContext } from 'react';

function useAppointmentContext(data) {
  const context = React.createContext({ data, updateData: () => {} });

  return useContext(context);
}

export default useAppointmentContext;
