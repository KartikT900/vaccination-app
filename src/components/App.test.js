import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import App from 'components/App';

import * as utils from 'utils';

describe('<App />', () => {
  it('renders correctly', async () => {
    const netCallSpy = jest.spyOn(utils, 'netCall');

    netCallSpy.mockReturnValue({});

    render(<App />);

    expect(screen.getByText('fetching data now')).toBeInTheDocument();

    await waitFor(() => screen.getByText('data: {}'));

    expect(screen.getByText('data: {}')).toBeInTheDocument();
  });
});
