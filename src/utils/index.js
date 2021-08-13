import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

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

/**
 *
 * @param  {...any} args Input of classNames to be combined
 *
 * A simple program that returns a string of joined classNames.
 * @example
 * // returns 'test-class test-class2 test-class3'
 * classnames('test-class', 'test-class2', 'test-class3');
 */

export const classnames = (...args) => {
  const classes = args.map((arg) => {
    if (!arg) {
      return;
    } else if (typeof arg === 'number') {
      throw new Error(`Expected some input`);
    } else {
      return arg;
    }
  });

  const classArray = classes.reduce((acc, curr) => {
    if (curr?.constructor === Object) {
      const classString = Object.values(curr)[0]
        ? Object.keys(curr)[0]
        : null;

      acc.push(classString);
    } else {
      acc.push(curr);
    }

    return acc;
  }, []);

  const joinedClasses = classArray
    .filter((value) => value)
    .join(' ')
    .trim();

  return joinedClasses;
};

export const filterDataByKey = (data = [], key) => {
  if (isEmpty(data)) {
    return null;
  } else if (key && key.length === 0) {
    return data;
  }

  const checkKeyExists = (item) =>
    key.includes(item?.vaccineName?.toLowerCase());

  return data?.filter(checkKeyExists);
};
