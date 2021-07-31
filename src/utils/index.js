import axios from 'axios';

export async function netCall(url, options) {
  if (!url || typeof url !== 'string') {
    console.error(
      `Expected baseUrl to be a string. Instead received ${typeof url}`
    );

    return;
  }

  axios.defaults.baseURL = 'https://cdn-api.co-vin.in/api/v2';

  const { method, headers, data } = options;

  const axiosConfig = {
    method,
    url,
    data: data || '',
    headers: headers || ''
  };

  const response = await axios({ ...axiosConfig });

  return response.data;
}
