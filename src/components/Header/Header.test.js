import React from 'react';
import { render, screen } from '@testing-library/react';

import Header, { baseClass } from 'components/Header/Header';

describe('<Header />', () => {
  it('renders correctly', () => {
    const { container } = render(<Header />);

    expect(container.firstChild).toHaveClass(baseClass);
    expect(
      screen.getByText('Vaccine Slot Booking')
    ).toBeInTheDocument();
  });
});
