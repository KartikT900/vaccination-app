import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import tt from '@tomtom-international/web-sdk-services';

import App, { TT_SERVICE_API_KEY } from 'components/App';

jest.mock('containers/Search/Search', () => 'mock-search');
jest.mock(
  'components/AppointmentsInfo/AppointmentsInfo',
  () => 'mock-appointments-info'
);
jest.mock('@tomtom-international/web-sdk-services', () => {
  return {
    services: {
      reverseGeocode: jest.fn().mockResolvedValue({
        addresses: [{ address: { postalCode: 999999 } }]
      })
    }
  };
});

describe('<App />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('calls reverseGeocode with correct options and renders correct when geo data loads correctly', async () => {
    const position = {
      coords: {
        latitude: 1,
        longitude: 3
      }
    };

    global.navigator.geolocation = {
      getCurrentPosition: jest
        .fn()
        .mockImplementationOnce((success) =>
          Promise.resolve(success(position))
        )
    };

    render(<App />);

    await waitFor(() => {
      expect(tt.services.reverseGeocode).toBeCalledWith({
        key: TT_SERVICE_API_KEY,
        position: position.coords
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          'Pincode is auto populated based on your device location'
        )
      ).toBeInTheDocument();
    });
  });

  it('calls reverseGeocode with correct options and renders correct when geo data loads correctly', async () => {
    global.navigator.geolocation = {
      getCurrentPosition: jest
        .fn()
        .mockImplementationOnce((success, error) =>
          // Resolve here as well, as per my understanding, the actual
          // implementation does not reject, but resolves by calling error.
          Promise.resolve(error())
        )
    };

    render(<App />);

    await waitFor(() => {
      expect(tt.services.reverseGeocode).not.toBeCalled();
    });

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Pincode is auto populated based on your device location'
        )
      ).not.toBeInTheDocument();
    });

    expect(
      await screen.findByText(
        'Ensure location service access is granted.'
      )
    ).toBeInTheDocument();
  });
});
