import React from 'react';
import { render } from '@testing-library/react';

import App from 'components/App';

describe('<App />', () => {
  it('renders correctly', async () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
});
