import React from 'react';
import { render } from '@testing-library/react';

import App from 'components/App';

jest.mock('containers/AppContainer', () => 'mock-app-container');

describe('<App />', () => {
  it('renders correctly', async () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
});
