import React from 'react';
import { render, screen } from '@testing-library/react';

import Panel from 'components/Panel/Panel';

describe('<Panel />', () => {
  it('renders correctly', () => {
    render(
      <Panel header={'heading text'}>
        <span>body text</span>
      </Panel>
    );

    expect(screen.getByText('heading text')).toHaveClass(
      'vcc-panel-header'
    );
    expect(screen.getByText('body text').parentElement).toHaveClass(
      'vcc-panel-body'
    );
  });

  it('renders null when no children are passed', () => {
    const { container } = render(<Panel />);

    expect(container.firstChild).toBeNull();
  });

  it('does not render header when not passed', () => {
    render(
      <Panel>
        <span>body text</span>
      </Panel>
    );
    expect(screen.getByText('body text')).toBeInTheDocument();
    expect(screen.getByText('body text').parentElement).toHaveClass(
      'vcc-panel-body'
    );

    expect(
      screen.queryByTestId('panel-header')
    ).not.toBeInTheDocument();
  });
});
