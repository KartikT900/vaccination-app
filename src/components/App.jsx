import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';

import tt from '@tomtom-international/web-sdk-services';

import AppContainer from 'containers/AppContainer';

export const TT_SERVICE_API_KEY = process.env.TT_KEY || 'key';

function App() {
  const [isGeoEnabled, setIsGeoEnabled] = useState(false);
  const [isGeoPermissionDenied, setGeoPermissionDenied] =
    useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [localeData, setAreaLocaleData] = useState(null);
  const [fetchingGeoData, setFetchingGeoData] = useState(true);

  const geoSuccessHandler = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setCoordinates({
      latitude,
      longitude
    });
    setIsGeoEnabled(true);

    return;
  };

  const geoErrorHandler = () => setGeoPermissionDenied(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        geoSuccessHandler,
        geoErrorHandler
      );
    } else {
      setIsGeoEnabled(false);
    }
  }, []);

  useEffect(() => {
    async function loadLocaleData() {
      try {
        const arealocaleData = await tt.services.reverseGeocode({
          key: TT_SERVICE_API_KEY,
          position: coordinates
        });

        setAreaLocaleData(arealocaleData);
        setFetchingGeoData(false);
      } catch (error) {
        console.error(error);
        setFetchingGeoData(false);
      }
    }

    if (coordinates && isGeoEnabled) {
      loadLocaleData();
    }
  }, [coordinates, isGeoEnabled]);

  return (
    <AppContainer
      isGeoEnabled={isGeoEnabled}
      isGeoPermissionDenied={isGeoPermissionDenied}
      localeData={localeData}
      geoDataLoading={fetchingGeoData}
    />
  );
}

export default hot(App);
