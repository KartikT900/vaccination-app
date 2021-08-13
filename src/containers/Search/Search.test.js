import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';

import {
  appointmentsBaseUrl,
  districtsListBaseUrl
} from 'hooks/useFetch';

import * as appointmentContext from 'hooks/useAppointmentContext';
import * as districtListContext from 'hooks/useDistrictListContext';

import * as utils from 'utils';

import Search from 'containers/Search/Search';

describe('<Search />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const searchDate = '2021-08-11';

  it('renders correctly', () => {
    render(<Search />);
    const radioOptions = screen.getAllByRole('radio');

    expect(radioOptions).toHaveLength(2);
    expect(radioOptions[0]).not.toBeChecked();
    expect(radioOptions[1]).not.toBeChecked();
    expect(
      screen.queryByText('Please enter State ID')
    ).not.toBeInTheDocument();
  });

  it('handles click on radio options', () => {
    render(<Search />);

    const radioOptions = screen.getAllByRole('radio');

    fireEvent.click(radioOptions[0]);

    expect(screen.getByLabelText('By Pin')).toBeChecked();
    expect(screen.getByLabelText('By District')).not.toBeChecked();
    expect(screen.getAllByRole('textbox')[0]).toHaveAttribute(
      'placeholder',
      'Pincode...'
    );

    fireEvent.click(radioOptions[1]);

    expect(screen.getByLabelText('By Pin')).not.toBeChecked();
    expect(screen.getByLabelText('By District')).toBeChecked();
    expect(screen.getAllByRole('textbox')[0]).toHaveAttribute(
      'placeholder',
      'Please enter State Id...'
    );
  });

  it('calls fetchData in useFetch hook with correct parameters when By Pin radio is checked', async () => {
    const netCallSpy = jest.spyOn(utils, 'netCall');

    jest
      .spyOn(appointmentContext, 'useAppointmentContext')
      .mockImplementation(() => {
        return {
          updateAppointments: jest.fn()
        };
      });

    netCallSpy.mockResolvedValue({ test: 'mocked data' });

    render(<Search />);

    const pinRadio = screen.getByLabelText('By Pin');
    const searchInput = screen.getAllByRole('textbox')[0];
    const dateInput = screen.getAllByRole('textbox')[1];
    const searchButton = screen.getByRole('button');

    fireEvent.click(pinRadio);
    expect(screen.getByLabelText('By Pin')).toBeChecked();

    fireEvent.change(dateInput, {
      target: {
        value: searchDate
      }
    });

    fireEvent.change(searchInput, {
      target: {
        value: 123456
      }
    });

    expect(netCallSpy).not.toBeCalled();
    expect(searchInput.value).toEqual('123456');
    expect(dateInput.value).toEqual(searchDate);

    act(() => {
      fireEvent.click(searchButton);
    });

    await waitFor(() =>
      expect(netCallSpy).toHaveBeenCalledWith(
        appointmentsBaseUrl,
        `/findByPin?pincode=123456&date=${searchDate
          .split('-')
          .reverse()
          .join('-')}`,
        { method: 'GET' }
      )
    );
  });

  it('calls fetchData in useFetch hook with correct parameters when By District radio is checked', async () => {
    const netCallSpy = jest.spyOn(utils, 'netCall');

    const useDistrictListContextSpy = jest.spyOn(
      districtListContext,
      'useDistrictListContext'
    );

    useDistrictListContextSpy.mockImplementation(() => {
      return {
        updateDistrictList: jest.fn()
      };
    });

    netCallSpy.mockResolvedValue({ test: 'mocked data' });

    render(<Search />);

    const districtRadio = screen.getByLabelText('By District');
    const searchInput = screen.getAllByRole('textbox')[0];
    const dateInput = screen.getAllByRole('textbox')[1];
    const searchButton = screen.getByRole('button');

    fireEvent.click(districtRadio);

    expect(screen.getAllByRole('textbox')[0]).toHaveAttribute(
      'placeholder',
      'Please enter State Id...'
    );
    expect(screen.getByLabelText('By District')).toBeChecked();

    fireEvent.change(searchInput, {
      target: {
        value: 123456
      }
    });

    fireEvent.change(dateInput, {
      target: {
        value: searchDate
      }
    });

    expect(netCallSpy).not.toBeCalled();
    expect(searchInput.value).toEqual('123456');
    expect(dateInput.value).toEqual(searchDate);

    act(() => {
      fireEvent.click(searchButton);
    });

    waitFor(() =>
      expect(netCallSpy).toHaveBeenCalledWith(
        districtsListBaseUrl,
        `/districts/123456`,
        { method: 'GET' }
      )
    );
  });

  it('renders correctly when geoLocatedPincode is available', () => {
    render(<Search geoLocatedPincode={123456} />);

    const searchInput = screen.getAllByRole('textbox')[0];

    expect(searchInput.value).toEqual('123456');
  });
});
