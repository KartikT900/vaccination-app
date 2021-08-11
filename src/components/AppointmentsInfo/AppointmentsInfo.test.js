import { screen } from '@testing-library/react';

import AppoinmentsInfo, {
  baseClass
} from 'components/AppointmentsInfo/AppointmentsInfo';
import { AppointmentsContext } from 'hooks/useAppointmentContext';

import { withContextProvider } from 'utils/testUtils';

import data from 'sample/appointments';

describe('<AppointmentsInfo />', () => {
  it('renders correctly when appointments data is available', () => {
    const providerProps = {
      value: { sessions: data }
    };
    const { container } = withContextProvider(
      AppointmentsContext,
      AppoinmentsInfo,
      { providerProps }
    );

    expect(container.firstChild).toHaveClass(baseClass);
    expect(screen.getAllByTestId('item')).toHaveLength(6);
  });

  it('renders null when no data is available', () => {
    const providerProps = {
      value: null
    };
    const { container } = withContextProvider(
      AppointmentsContext,
      AppoinmentsInfo,
      { providerProps }
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders no data message when sessions are empty', () => {
    const providerProps = {
      value: { sessions: [] }
    };
    const { container } = withContextProvider(
      AppointmentsContext,
      AppoinmentsInfo,
      { providerProps }
    );

    expect(container.firstChild).not.toBeNull();
    expect(
      screen.getByText('No slots available. Try another date.')
    ).toBeInTheDocument();
  });
});
