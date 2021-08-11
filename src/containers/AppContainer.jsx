import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Dimmer, Loader, Message } from 'semantic-ui-react';

import AppoinmentsInfo from 'components/AppointmentsInfo/AppointmentsInfo';
import Header from 'components/Header/Header';
import Search from 'containers/Search/Search';

import AppointmentsProvider from 'hooks/useAppointmentContext';

export const baseClass = 'vcc-app-container';

function AppContainer({
  isGeoEnabled,
  isGeoPermissionDenied,
  geoDataLoading,
  localeData
}) {
  const [messageVisible, setMessageVisible] = useState({
    geoError: true,
    geoSuccess: true
  });
  const { addresses = [] } = localeData || {};
  const geoLocatedPincode = addresses[0]?.address?.postalCode || null;

  if (geoDataLoading && !isGeoPermissionDenied) {
    return (
      <div className={baseClass}>
        <Dimmer active={geoDataLoading}>
          <Loader />
        </Dimmer>
      </div>
    );
  }

  return (
    <>
      <Header />
      <AppointmentsProvider>
        <div className={baseClass}>
          {!isGeoEnabled &&
            isGeoPermissionDenied &&
            messageVisible.geoError && (
              <Message
                negative
                onDismiss={() =>
                  setMessageVisible({
                    ...messageVisible,
                    geoError: false
                  })
                }
                header={
                  'This device/browser does not support location services.'
                }
                content={'Ensure location service access is granted.'}
              />
            )}
          {isGeoEnabled &&
            !geoDataLoading &&
            !localeData &&
            messageVisible.geoError && (
              <Message
                negative
                onDismiss={() =>
                  setMessageVisible({
                    ...messageVisible,
                    geoError: false
                  })
                }
                header={'Failed to fetch location pincode.'}
              />
            )}
          {isGeoEnabled &&
            !isGeoPermissionDenied &&
            localeData &&
            messageVisible.geoSuccess && (
              <Message
                positive
                onDismiss={() =>
                  setMessageVisible({
                    ...messageVisible,
                    geoSuccess: false
                  })
                }
                header="Pincode is auto populated based on your device location"
              />
            )}
          <Search geoLocatedPincode={geoLocatedPincode} />
          <AppoinmentsInfo />
        </div>
      </AppointmentsProvider>
    </>
  );
}

AppContainer.propTypes = {
  isGeoEnabled: PropTypes.bool,
  isGeoPermissionDenied: PropTypes.bool,
  geoDataLoading: PropTypes.bool,
  localeData: PropTypes.object,
  locationError: PropTypes.bool
};

export default AppContainer;
