import { useState } from 'react';

import { netCall } from 'utils';

export const apiBaseUrl = 'https://cdn-api.co-vin.in/api/v2';
export const appointmentsBaseUrl = `${apiBaseUrl}/appointment/sessions/public`;
export const districtsListBaseUrl = `${apiBaseUrl}/admin/location`;

function useFetch() {
  const [data, setData] = useState(null);

  const getBaseUrl = (value) => {
    switch (value) {
      case 'appointments':
        return appointmentsBaseUrl;
      case 'districtList':
        return districtsListBaseUrl;
      default:
        return;
    }
  };
  const getEndpoint = (searchType) => {
    const { key, id } = searchType;

    switch (key) {
      case 'byPin':
        return {
          url: `/findByPin?pincode=${id}&date="04-08-2021"`,
          method: 'GET'
        };
      case 'byDistrict':
        return {
          url: '/findByDistrict?district_id=512&date=31-03-2021',
          method: 'GET'
        };
      case 'district':
        return { url: `/districts/${id}`, method: 'GET' };
      default:
        return {};
    }
  };

  const fetchData = async (searchOptions) => {
    const { requestFor, searchType = {} } = searchOptions;
    const baseUrl = getBaseUrl(requestFor);
    const { url, method } = getEndpoint(searchType);

    if (!baseUrl || !url) {
      setData(null);
      return;
    }
    const response = await netCall(baseUrl, url, { method });

    setData(response);
  };

  return { data, fetchData };
}

export default useFetch;
