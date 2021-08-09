import React from 'react';

import AppoinmentsInfo from 'components/AppointmentsInfo/AppointmentsInfo';
import Header from 'components/Header/Header';
import Search from 'containers/Search/Search';

import AppointmentsProvider from 'hooks/useAppointmentContext';

export const baseClass = 'vcc-app-container';

function AppContainer() {
  return (
    <>
      <Header />
      <AppointmentsProvider>
        <div className={baseClass}>
          <Search />
          <AppoinmentsInfo />
        </div>
      </AppointmentsProvider>
    </>
  );
}

export default AppContainer;
