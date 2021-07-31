import axios from 'axios';

/**
 *
 * @param {string} url A string value of the resource that will be fetched
 * @param {object} options An object listing out various operational parameters required for fetch request to begin
 * @returns Fetched response
 */
export async function netCall(baseUrl, url, options) {
  if (typeof url !== 'string' || !url) {
    console.error(
      `Expected url to be a string. Instead received ${typeof url}`
    );

    return null;
  }

  axios.defaults.baseURL = baseUrl;

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
