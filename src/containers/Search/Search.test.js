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

import * as utils from 'utils';

import Search from 'containers/Search/Search';

describe('<Search />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    expect(
      screen.queryByText('Please enter State ID')
    ).not.toBeInTheDocument();

    fireEvent.click(radioOptions[1]);

    expect(screen.getByLabelText('By Pin')).not.toBeChecked();
    expect(screen.getByLabelText('By District')).toBeChecked();
    expect(
      screen.getByText('Please enter State ID')
    ).toBeInTheDocument();
  });

  it('calls fetchData in useFetch hook with correct parameters when By Pin radio is checked', async () => {
    const netCallSpy = jest.spyOn(utils, 'netCall');

    netCallSpy.mockResolvedValue({ test: 'mocked data' });

    render(<Search />);

    const pinRadio = screen.getByLabelText('By Pin');
    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button');

    fireEvent.click(pinRadio);
    expect(screen.getByLabelText('By Pin')).toBeChecked();

    fireEvent.change(searchInput, {
      target: {
        value: 123456
      }
    });

    expect(netCallSpy).not.toBeCalled();
    expect(searchInput.value).toEqual('123456');
    expect(
      screen.queryByText('fetched data by pin')
    ).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      screen.getByText(JSON.stringify({ test: 'mocked data' }));
    });

    expect(netCallSpy).toHaveBeenCalledWith(
      appointmentsBaseUrl,
      `/findByPin?pincode=123456&date="04-08-2021"`,
      { method: 'GET' }
    );
    expect(screen.getByTestId('api-data')).toHaveTextContent(
      JSON.stringify({ test: 'mocked data' })
    );
  });

  it('calls fetchData in useFetch hook with correct parameters when By District radio is checked', async () => {
    const netCallSpy = jest.spyOn(utils, 'netCall');

    netCallSpy.mockResolvedValue({ test: 'mocked data' });

    render(<Search />);

    const pinRadio = screen.getByLabelText('By District');
    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button');

    expect(
      screen.queryByText('Please enter State ID')
    ).not.toBeInTheDocument();

    fireEvent.click(pinRadio);

    expect(
      screen.getByText('Please enter State ID')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('By District')).toBeChecked();

    fireEvent.change(searchInput, {
      target: {
        value: 123456
      }
    });

    expect(netCallSpy).not.toBeCalled();
    expect(searchInput.value).toEqual('123456');
    expect(
      screen.queryByText(JSON.stringify({ test: 'mocked data' }))
    ).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      screen.getByText(JSON.stringify({ test: 'mocked data' }));
    });

    expect(netCallSpy).toHaveBeenCalledWith(
      districtsListBaseUrl,
      `/districts/123456`,
      { method: 'GET' }
    );
    expect(screen.getByTestId('api-data')).toHaveTextContent(
      JSON.stringify({ test: 'mocked data' })
    );
  });
});
